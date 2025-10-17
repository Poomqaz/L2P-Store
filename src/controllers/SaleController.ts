import { PrismaClient, Prisma, Decimal } from "@prisma/client"; // 1. แก้ไข Import Decimal
import type { SaleInterface } from '../interface/SaleInterface'; 

const prisma = new PrismaClient();

// ⭐️ Type Definitions ที่จำเป็น ⭐️

interface ResponseSet {
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

// Type สำหรับ SaleDetail ที่ใช้ใน Controller ก่อนส่งให้ Prisma
interface SaleDetailControllerData {
    bookId: string;
    qty: number;
    price: number; // ใช้ number ในการคำนวณ
}

// 🎯 Type สำหรับผลลัพธ์จาก searchBook (Select fields)
type BookSearchResult = {
    id: string;
    name: string;
    isbn: string | null;
    price: Prisma.Decimal; // เป็น Decimal ก่อนการ Map
    qty: number;
    image: string | null;
    status: string;
};

// 🎯 Type สำหรับผลลัพธ์จาก tx.book.findMany ใน Transaction (Select fields)
type BookTransactionResult = {
    id: string;
    qty: number;
    price: Prisma.Decimal;
    name: string;
};


// ----------------------------------------------------------------------

const getAdminIdByToken = async (request: RequestContext, jwtLibrary: JwtLibrary): Promise<string> => {
    
    if (!request) {
        throw new Error('Request object is missing.');
    }
    
    let authHeader: string | undefined | null = undefined;
    
    const headers = request.headers;
    if (headers && 'get' in headers && typeof headers.get === 'function') {
        authHeader = headers.get('Authorization');
    } else if (headers) {
        authHeader = (headers as { authorization?: string, Authorization?: string }).authorization || (headers as { authorization?: string, Authorization?: string }).Authorization;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header is missing or malformed.');
    }
    
    const token = authHeader.replace('Bearer ', '');
    const SECRET_KEY = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY'; 
    
    try {
        const payload = await jwtLibrary.verify(token, SECRET_KEY); 
        
        if (!payload || !payload.id) {
            throw new Error('Admin ID missing or token is invalid.');
        }

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

            // 💡 Cast Type ที่ได้จาก Prisma เพื่อให้ TypeScript รู้จัก
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
                    price: true, 
                    qty: true, 
                    image: true,
                    status: true, 
                },
                take: 10
            }) as BookSearchResult[];
            
            // 🎯 กำหนด Type ให้ book ใน map callback
            const resultBooks = books.map((book: BookSearchResult) => { 
                const priceAsNumber = (book.price as unknown as Decimal)?.toNumber ? 
                                       (book.price as unknown as Decimal).toNumber() : 
                                       book.price as number;
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
                
                // 💡 Cast Type ที่ได้จาก Prisma
                const booksInDb = await tx.book.findMany({ 
                    where: { id: { in: bookIds } },
                    select: { id: true, qty: true, price: true, name: true }
                }) as BookTransactionResult[];
                
                let subtotal = 0;
                const saleDetailsData: SaleDetailControllerData[] = [];

                for (const item of items) {
                    // 🎯 กำหนด Type ให้ b ใน find callback
                    const book = booksInDb.find((b: BookTransactionResult) => b.id === item.bookId); 
                    
                    if (!book) throw new Error(`Book with ID: ${item.bookId} not found`);
                    if (book.qty < item.qty) throw new Error(`Not enough stock for '${book.name}' (Available: ${book.qty})`);
                    
                    const bookPrice = (book.price as unknown as Decimal)?.toNumber ? 
                                      (book.price as unknown as Decimal).toNumber() : 
                                      book.price as number;
                    
                    const itemSubtotal = bookPrice * item.qty;
                    subtotal += itemSubtotal;

                    saleDetailsData.push({
                        bookId: item.bookId,
                        qty: item.qty,
                        price: bookPrice
                    });
                }
                
                // ... โค้ดส่วนอื่น ๆ ที่เกี่ยวข้องกับ Transaction ...
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
                
                const decimalToNumber = (val: Decimal | number | undefined | null) => 
                    (val as unknown as Decimal)?.toNumber ? 
                    (val as unknown as Decimal).toNumber() : 
                    val as number;

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