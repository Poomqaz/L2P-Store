// ในไฟล์: ./src/controllers/SaleController.ts

import { PrismaClient, Prisma } from "../../generated/prisma"; 
import type { SaleInterface } from '../interface/SaleInterface'; 
// ❌ บรรทัดนี้ถูกลบทิ้งไปแล้ว: import { Decimal } from 'decimal.js'; 

const prisma = new PrismaClient();

// ⭐️ Type Definitions ที่จำเป็น ⭐️

interface ResponseSet {
// ... (โค้ด Type Definitions เหมือนเดิม) ...
    status: number | string;
}

interface SearchQuery {
    q?: string;
}

interface JwtPayload {
    id: string;
}

interface JwtLibrary {
    verify: (token: string, secret: string) => Promise<JwtPayload | null>;
}

type RequestHeaders = {
    get: (key: string) => string | undefined;
    authorization?: string; 
    Authorization?: string;
};

interface RequestContext {
    headers: RequestHeaders | (Partial<RequestHeaders> & { [key: string]: unknown }); 
}

// Type สำหรับ SaleDetail ที่ใช้ใน Controller (ยังคงใช้ number เพื่อความง่ายในการคำนวณ)
interface SaleDetailControllerData {
    bookId: string;
    qty: number;
    price: number; 
}

// ----------------------------------------------------------------------

// 💡 Type Guard ที่ใช้จัดการ Prisma.Decimal โดยไม่พึ่งพาการ Import อื่น
function isPrismaDecimal(value: unknown): value is { toNumber: () => number } {
    return typeof value === 'object' && value !== null && 'toNumber' in value && typeof (value as { toNumber: unknown }).toNumber === 'function';
}


const getAdminIdByToken = async (request: RequestContext, jwtLibrary: JwtLibrary): Promise<string> => {
// ... (โค้ดส่วนนี้เหมือนเดิม) ...
    if (!request) { throw new Error('Request object is missing.'); }
    let authHeader: string | undefined | null = undefined;
    const headers = request.headers;
    if (headers && 'get' in headers && typeof headers.get === 'function') {
        authHeader = headers.get('Authorization');
    } else if (headers) {
        authHeader = (headers as { authorization?: string, Authorization?: string }).authorization || (headers as { authorization?: string, Authorization?: string }).Authorization;
    }
    if (!authHeader || !authHeader.startsWith('Bearer ')) { throw new Error('Authorization header is missing or malformed.'); }
    const token = authHeader.replace('Bearer ', '');
    const SECRET_KEY = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY'; 
    try {
        const payload = await jwtLibrary.verify(token, SECRET_KEY); 
        if (!payload || !payload.id) { throw new Error('Admin ID missing or token is invalid.'); }
        return payload.id;
    } catch (jwtError: unknown) {
        const message = jwtError instanceof Error ? jwtError.message : 'Unknown JWT error';
        throw new Error(`JWT verification failed: ${message}`);
    }
}


export const SaleController = {

    searchBook: async ({ query, set }: { query: SearchQuery, set: ResponseSet }) => {
        try {
            const keyword = query.q || '';
            if (!keyword.trim()) return [];

            const books = await prisma.book.findMany({
                where: {
                    OR: [
                        { name: { contains: keyword, mode: 'insensitive' } },
                        { isbn: { equals: keyword } }
                    ],
                    status: 'active', 
                    qty: { gt: 0 } 
                },
                select: {
                    id: true,
                    name: true,
                    isbn: true,
                    price: true, // Prisma.Decimal
                    qty: true, 
                    image: true,
                    status: true, 
                },
                take: 10
            });
            
            // 🎯 จัดการ Type Conversion ใน Map
            const resultBooks = books.map((book) => { 
                const priceValue = book.price as unknown;
                
                const priceAsNumber = isPrismaDecimal(priceValue) ? 
                                       priceValue.toNumber() : 
                                       priceValue as number; // Fallback to number if already converted
                
                return {
                    ...book,
                    price: priceAsNumber 
                };
            });

            return resultBooks;

        } catch { 
            set.status = 500;
            return { error: 'An error occurred while searching for books.' };
        }
    },

    searchMember: async ({ query, set }: { query: SearchQuery, set: ResponseSet }) => {
        try {
            const keyword = query.q;
            if (!keyword || keyword.trim() === '') {
                 set.status = 400;
                 return { message: 'Please provide a search query (phone or email).' };
            }
            const member = await prisma.member.findFirst({
                where: { 
                    OR: [
                        { phone: keyword }, 
                        { email: keyword }
                    ],
                    status: 'active'
                },
                select: { id: true, name: true, email: true, points: true, phone: true }
            });
            if (!member) {
                set.status = 404;
                return { message: 'Member not found.' };
            }
            return member;
        } catch { 
            set.status = 500;
            return { error: 'An error occurred while searching for the member.' };
        }
    },

    create: async ({ body, set, request, jwt }: { 
        body: SaleInterface, 
        set: ResponseSet, 
        request: RequestContext, 
        jwt: JwtLibrary 
    }) => {
        
        let adminIdFromAuth: string;
        try {
            adminIdFromAuth = await getAdminIdByToken(request, jwt); 
        } catch (authErr: unknown) {
            console.error('Authentication error:', authErr);
            set.status = 401;
            const message = authErr instanceof Error ? authErr.message : 'Unknown authentication error';
            return { message: `Unauthorized. ${message}` };
        }

        try {
            const { memberId, paymentMethod, items, pointsToRedeem = 0, cashPaid } = body;
            const cashPaidFloat = parseFloat(cashPaid.toFixed(2));

            const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const bookIds = items.map(item => item.bookId);
                
                const booksInDb = await tx.book.findMany({ 
                    where: { id: { in: bookIds } },
                    select: { id: true, qty: true, price: true, name: true } // price เป็น Prisma.Decimal
                }); 
                
                let subtotal = 0;
                const saleDetailsData: SaleDetailControllerData[] = [];

                for (const item of items) {
                    const book = booksInDb.find((b) => b.id === item.bookId); 
                    
                    if (!book) throw new Error(`Book with ID: ${item.bookId} not found`);
                    if (book.qty < item.qty) throw new Error(`Not enough stock for '${book.name}' (Available: ${book.qty})`);
                    
                    // 💡 การแปลง Prisma.Decimal ไปเป็น number อย่างปลอดภัย
                    const bookPriceValue = book.price as unknown;
                    const bookPrice = isPrismaDecimal(bookPriceValue) ? 
                                      bookPriceValue.toNumber() : 
                                      bookPriceValue as number;
                    
                    const itemSubtotal = bookPrice * item.qty;
                    subtotal += itemSubtotal;

                    saleDetailsData.push({
                        bookId: item.bookId,
                        qty: item.qty,
                        price: bookPrice
                    });
                }
                
                // ... (โค้ดคำนวณและตรวจสอบเงื่อนไขถูกต้องแล้ว) ...
                const finalTotalFloat = subtotal - pointsToRedeem;
                const finalTotal = parseFloat(finalTotalFloat.toFixed(2));

                const change = cashPaidFloat - finalTotal; 
                if (change < -0.01) { 
                    throw new Error(`Insufficient payment. Total due: ${finalTotal.toFixed(2)}, Paid: ${cashPaidFloat.toFixed(2)}.`);
                }
                
                const pointsEarned = memberId ? Math.floor(finalTotal / 100) : 0; 
                let updatedMember = null;
                
                if (memberId) {
                    const memberRecord = await tx.member.findUnique({ where: { id: memberId }, select: { points: true } });
                    if (!memberRecord) { throw new Error(`Member ID: ${memberId} not found.`); }
                    if (memberRecord.points < pointsToRedeem) { throw new Error(`Insufficient member points. Available: ${memberRecord.points || 0}, Used: ${pointsToRedeem}.`); }

                    const netPointChange = pointsEarned - pointsToRedeem;
                    
                    if (netPointChange !== 0) {
                        const updateData = netPointChange > 0 ? { increment: netPointChange } : { decrement: Math.abs(netPointChange) };
                        updatedMember = await tx.member.update({ where: { id: memberId }, data: { points: updateData }, select: { points: true } });
                    } else {
                        updatedMember = memberRecord; 
                    }
                }

                const sale = await tx.sale.create({
                    data: { 
                        adminId: adminIdFromAuth, 
                        memberId, 
                        paymentMethod,
                        total: finalTotal,
                        cashPaid: cashPaidFloat,
                        change: change > 0 ? parseFloat(change.toFixed(2)) : 0, 
                        pointUsed: pointsToRedeem,
                        details: {
                            createMany: {
                                data: saleDetailsData.map(d => ({ 
                                    bookId: d.bookId,
                                    qty: d.qty,
                                    // 🎯 ใช้ new Prisma.Decimal(d.price) ซึ่งถูกต้องตาม Type ของ Prisma
                                    price: new Prisma.Decimal(d.price) 
                                })),
                            }
                        }
                    }
                });
                
                for (const item of items) {
                    await tx.book.update({
                        where: { id: item.bookId },
                        data: { qty: { decrement: item.qty } }
                    });
                }

                const finalReceipt = await tx.sale.findUnique({
                    where: { id: sale.id },
                    include: { 
                        details: { include: { book: { select: { name: true, isbn: true } } } },
                        member: { select: { name: true, points: true, phone: true } },
                        admin: { select: { name: true } } 
                    }
                });
                
                const currentMemberPoints = updatedMember?.points ?? finalReceipt?.member?.points ?? 0;

                if (finalReceipt?.member) {
                    finalReceipt.member.points = currentMemberPoints;
                }
                
                const decimalToNumber = (val: Prisma.Decimal | number | undefined | null) => {
                    const value = val as unknown;
                    return isPrismaDecimal(value) ? value.toNumber() : value as number;
                }

                return { 
                    ...finalReceipt, 
                    total: decimalToNumber(finalReceipt?.total),
                    cashPaid: decimalToNumber(finalReceipt?.cashPaid),
                    change: decimalToNumber(finalReceipt?.change),
                    pointUsed: decimalToNumber(finalReceipt?.pointUsed),
                    earnedPoints: pointsEarned,
                    newPoints: currentMemberPoints
                };
            });

            set.status = 201;
            return { message: "Sale successful", data: result };

        } catch (err: unknown) {
            console.error('Transaction error:', err);
            
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            
            if (errorMessage.includes('not found') || errorMessage.includes('stock') || errorMessage.includes('points') || errorMessage.includes('payment') || errorMessage.includes('token')) {
                set.status = 400; 
            } else {
                set.status = 500; 
            }
            return { message: errorMessage };
        }
    }
}