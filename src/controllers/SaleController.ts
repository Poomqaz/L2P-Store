import { PrismaClient, Prisma } from "../../generated/prisma"; 
import { SaleInterface } from '../interface/SaleInterface'; 
import { Sale } from "../../generated/prisma/client"; 

const prisma = new PrismaClient();

const getAdminIdByToken = async (request: any, jwtLibrary: any) => {
    // ตรวจสอบ request object และ headers
    if (!request) {
        throw new Error('Request object is missing.');
    }
    
    let authHeader;
    
    // ลองหาค่า Authorization header จากหลายๆ แหล่ง (โค้ดเดิมดีอยู่แล้ว)
    if (request.headers && typeof request.headers.get === 'function') {
        authHeader = request.headers.get('Authorization');
    } else if (request.headers && request.headers.authorization) {
        authHeader = request.headers.authorization;
    } else if (request.headers && request.headers.Authorization) {
        authHeader = request.headers.Authorization;
    } else {
        console.log('Available request properties:', Object.keys(request));
        console.log('Headers object:', request.headers);
        throw new Error('Cannot access Authorization header. Headers object might be in different format.');
    }
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header is missing or malformed.');
    }
    
    const token = authHeader.replace('Bearer ', '');
    const SECRET_KEY = process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY'; 
    
    try {
        // *** หมายเหตุ: ถ้าใช้ Elysia/Bun อาจต้องปรับวิธีเรียก jwtLibrary.verify ให้ตรงกับรูปแบบที่ใช้
        const payload: any = await jwtLibrary.verify(token, SECRET_KEY); 
        
        if (!payload.id) {
            throw new Error('Admin ID missing in token payload.');
        }

        return payload.id as string;
    } catch (jwtError: any) {
        throw new Error(`JWT verification failed: ${jwtError.message}`);
    }
}


export const SaleController = {

    // 1. ค้นหาสินค้าด้วยชื่อหรือ ISBN 
    searchBook: async ({ query, set }: { query: { q?: string }, set: any }) => {
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
                    price: true,
                    qty: true, 
                    image: true,
                    status: true, 
                },
                take: 10
            });
            return books; 

        } catch (err) {
            set.status = 500;
            return { error: 'An error occurred while searching for books.' };
        }
    },

    // 2. ค้นหาสมาชิกด้วยเบอร์โทรศัพท์หรืออีเมล
    searchMember: async ({ query, set }: { query: { q?: string }, set: any }) => {
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
        } catch (err) {
            set.status = 500;
            return { error: 'An error occurred while searching for the member.' };
        }
    },

    /**
     * 3. สร้างรายการขาย (บันทึก, ตัดสต็อก, จัดการแต้ม, คำนวณเงินทอน)
     * @param req Request Object จาก Framework ที่ใช้
     * @param jwt ไลบรารี JWT ที่ถูกส่งเข้ามา (ถ้าใช้ Framework ที่ฉีดให้)
     */
    create: async ({ body, set, request, jwt }: { body: SaleInterface, set: any, request: any, jwt: any }) => {
        
        let adminIdFromAuth: string;
        try {
            // 1. ดึง Admin ID จาก Request Header โดยใช้ Token
            adminIdFromAuth = await getAdminIdByToken(request, jwt); 

        } catch (authErr: any) {
            console.error('Authentication error:', authErr);
            set.status = 401;
            // 🛑 ส่ง Error 401 Unauthorized พร้อมข้อความที่ชัดเจน
            return { message: `Unauthorized. ${authErr.message || 'Token verification failed.'}` };
        }

        try {
            // 2. Destructuring ข้อมูล
            const { memberId, paymentMethod, items, pointsToRedeem = 0, cashPaid } = body;

            const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const bookIds = items.map(item => item.bookId);
                
                // ดึงข้อมูลหนังสือที่เกี่ยวข้องทั้งหมด
                const booksInDb = await tx.book.findMany({ 
                    where: { id: { in: bookIds } },
                    select: { id: true, qty: true, price: true, name: true }
                }); 
                
                let subtotal = 0;
                const saleDetailsData = [];

                // 2.1 ตรวจสอบสต็อกและคำนวณยอดรวมเบื้องต้น
                for (const item of items) {
                    const book = booksInDb.find(b => b.id === item.bookId); 
                    
                    if (!book) throw new Error(`Book with ID: ${item.bookId} not found`);
                    if (book.qty < item.qty) throw new Error(`Not enough stock for '${book.name}' (Available: ${book.qty})`);
                    
                    // คำนวณยอดรวมก่อนหักส่วนลด
                    const itemSubtotal = book.price * item.qty;
                    subtotal += itemSubtotal;

                    // 💡 NOTE: ลบฟิลด์ 'subtotal' ออก ถ้า SaleDetail model ไม่มีฟิลด์นี้
                    saleDetailsData.push({
                        bookId: item.bookId,
                        qty: item.qty,
                        price: book.price
                        // subtotal: itemSubtotal, // 💡 ถ้า SaleDetail Schema มี subtotal ให้ใส่กลับเข้ามา
                    });
                }

                // 2.2 จัดการส่วนลดแต้มสมาชิก
                const discountAmount = pointsToRedeem; 
                const finalTotalFloat = subtotal - discountAmount;
                const finalTotal = parseFloat(finalTotalFloat.toFixed(2)); // ยอดรวมสุทธิ (เป็น Float)

                // 2.3 คำนวณเงินทอนและตรวจสอบเงินที่จ่าย
                // ใช้ finalTotal แทน finalTotalFloat เพื่อให้ถูกต้องกับทศนิยม 2 ตำแหน่ง
                const change = cashPaid - finalTotal; 
                if (change < -0.01) { 
                    throw new Error(`Insufficient payment. Total due: ${finalTotal.toFixed(2)}, Paid: ${cashPaid.toFixed(2)}.`);
                }
                
                // 2.4 จัดการแต้มสมาชิก (ใช้ transaction)
                // คำนวณแต้มที่ได้รับ: สมมติว่าทุกๆ 100 บาท ได้ 1 แต้ม (จาก finalTotal)
                const pointsEarned = memberId ? Math.floor(finalTotal / 100) : 0; 
                let updatedMember = null;
                
                if (memberId) {
                    // ตรวจสอบแต้มที่มีอยู่ก่อนอัปเดตเพื่อป้องกันการใช้แต้มเกิน
                    const memberRecord = await tx.member.findUnique({
                        where: { id: memberId },
                        select: { points: true }
                    });

                    if (!memberRecord) {
                         throw new Error(`Member ID: ${memberId} not found.`);
                    }
                    if (memberRecord.points < pointsToRedeem) {
                         throw new Error(`Insufficient member points. Available: ${memberRecord?.points || 0}, Used: ${pointsToRedeem}.`);
                    }

                    // *** 💥 ส่วนที่แก้ไขเพื่อแก้ปัญหา Argument points: Expected Int, provided Object ***
                    const netPointChange = pointsEarned - pointsToRedeem;
                    const updateData = netPointChange > 0
                        ? { increment: netPointChange }
                        : { decrement: Math.abs(netPointChange) };
                    
                    if (netPointChange !== 0) {
                        updatedMember = await tx.member.update({
                            where: { id: memberId },
                            data: { 
                                points: updateData // ✅ ใช้ Object ที่มี increment หรือ decrement เพียงตัวเดียว
                            },
                            select: { points: true } 
                        });
                    } else {
                        // ถ้าแต้มสุทธิเป็น 0 ให้ใช้ข้อมูลเดิมเพื่อไม่ update
                         updatedMember = memberRecord; 
                    }
                }

                // 2.5 บันทึกรายการ Sale
                const sale = await tx.sale.create({
                    data: { 
                        adminId: adminIdFromAuth, 
                        memberId, 
                        paymentMethod,
                        total: finalTotal, // ใช้ finalTotal ที่เป็น Float/Decimal
                        cashPaid: cashPaid,
                        change: change > 0 ? parseFloat(change.toFixed(2)) : 0, // ปัดเศษเงินทอน
                        pointUsed: pointsToRedeem,
                        details: {
                            createMany: {
                                data: saleDetailsData.map(d => ({ ...d, saleId: undefined })),
                            }
                        }
                    }
                });
                
                // 2.6 ตัดยอดสต็อกสินค้า
                for (const item of items) {
                    await tx.book.update({
                        where: { id: item.bookId },
                        data: { qty: { decrement: item.qty } }
                    });
                }

                // 2.7 ดึงข้อมูลใบเสร็จฉบับสมบูรณ์เพื่อส่งกลับ
                const finalReceipt = await tx.sale.findUnique({
                    where: { id: sale.id },
                    include: { 
                        details: { include: { book: { select: { name: true, isbn: true } } } },
                        member: { select: { name: true, points: true, phone: true } },
                        admin: { select: { name: true } } 
                    }
                });
                
                // อัปเดตแต้มสมาชิกใหม่ใน object ที่จะส่งกลับ
                // ใช้แต้มที่อัปเดตแล้วจาก updatedMember หรือแต้มเดิมถ้าไม่มีการเปลี่ยนแปลง
                const currentMemberPoints = updatedMember?.points ?? finalReceipt?.member?.points ?? 0;

                if (finalReceipt?.member) {
                    // หากมีการอัปเดตแต้ม (updatedMember ไม่เป็น null)
                    finalReceipt.member.points = currentMemberPoints;
                }
                
                return { 
                    ...finalReceipt, 
                    earnedPoints: pointsEarned,
                    newPoints: currentMemberPoints
                };
            });

            set.status = 201;
            return { 
                message: "Sale successful", 
                data: result 
            };

        } catch (err: any) {
            console.error('Transaction error:', err);
            const errorMessage = err.message || 'An unexpected error occurred.';
            // จัดการ Error Code ตามประเภทของ Error
            if (errorMessage.includes('not found') || errorMessage.includes('stock') || errorMessage.includes('points') || errorMessage.includes('payment') || errorMessage.includes('token')) {
                set.status = 400; 
            } else {
                set.status = 500; 
            }
            return { message: errorMessage };
        }
    }
}