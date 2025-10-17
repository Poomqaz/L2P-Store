import { PrismaClient, Prisma } from "../../generated/prisma"; 

const prisma = new PrismaClient();

// ⭐️ Type Guard ที่เพิ่มเข้ามาเพื่อความปลอดภัย
function isDecimal(value: unknown): value is { toNumber: () => number } {
    return typeof value === 'object' && value !== null && 'toNumber' in value && typeof (value as { toNumber: unknown }).toNumber === 'function';
}

// 🎯 Type สำหรับ SaleDetail ที่มีฟิลด์ที่ถูก Include และ Select
type SaleDetailForSummary = {
    id: string; 
    saleId: string;
    bookId: string;
    qty: number;
    price: Prisma.Decimal; 
    createdAt: Date;
    updatedAt: Date;
    sale: Record<string, unknown>; 
    book: { 
        id: string; 
        name: string; 
        price: Prisma.Decimal; 
        description: string | null; 
        isbn: string | null; 
        image: string | null; 
        category: string | null; 
        qty: number; 
    }
};

// ----------------------------------------------------------------------

export class SaleDetailController {
    
    // ... getAllSaleDetails (โค้ดไม่เปลี่ยนแปลง) ...
    static async getAllSaleDetails() {
        try {
            const saleDetails = await prisma.saleDetail.findMany({
                include: {
                    sale: {
                        include: {
                            admin: true,
                            member: true
                        }
                    },
                    book: true
                },
                orderBy: {
                    id: 'desc'
                }
            });

            return {
                success: true,
                data: saleDetails,
                message: 'ดึงข้อมูล SaleDetail ทั้งหมดสำเร็จ'
            };
        } catch (error: unknown) { 
            console.error('Error getting all sale details:', error);
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูล SaleDetail: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // ดึงรายการ SaleDetail ตาม Sale ID
    static async getSaleDetailsBySaleId({ params }: { params: { saleId: string } }) {
        try {
            const saleId = params.saleId; // แก้ไข Unused Variable

            if (!saleId) {
                throw new Error('กรุณาระบุ Sale ID');
            }

            const saleDetails = await prisma.saleDetail.findMany({
                where: { saleId: saleId },
                include: {
                    sale: {
                        include: {
                            admin: { select: { id: true, name: true, username: true, level: true } },
                            member: { select: { id: true, name: true, username: true, phone: true, points: true } }
                        }
                    },
                    book: {
                        select: { id: true, name: true, price: true, description: true, isbn: true, image: true, category: true, qty: true }
                    }
                },
                orderBy: { id: 'asc' }
            }) as unknown as SaleDetailForSummary[]; 

            if (saleDetails.length === 0) {
                throw new Error('ไม่พบรายการขายสำหรับ Sale ID นี้');
            }
            
            const summary = {
                totalItems: saleDetails.length,
                totalQuantity: saleDetails.reduce((sum: number, detail: SaleDetailForSummary) => sum + detail.qty, 0),
                totalAmount: saleDetails.reduce((sum: number, detail: SaleDetailForSummary) => {
                    let priceAsNumber: number;

                    // 🎯 ใช้ Type Guard เพื่อยืนยัน Type Conversion อย่างปลอดภัย
                    if (isDecimal(detail.price)) {
                        priceAsNumber = detail.price.toNumber();
                    } else {
                        priceAsNumber = detail.price as unknown as number; 
                    }
                    
                    return sum + (priceAsNumber * detail.qty);
                }, 0),
                saleInfo: saleDetails[0].sale
            };

            return {
                success: true,
                data: saleDetails,
                summary: summary,
                message: 'ดึงข้อมูล SaleDetail สำเร็จ'
            };
        } catch (error: unknown) { 
            console.error('Error getting sale details by sale ID:', error);
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูล SaleDetail: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // ... getSaleDetailsByBookId (โค้ดไม่เปลี่ยนแปลง) ...
    static async getSaleDetailsByBookId({ params, query }: { params: { bookId: string }, query: { page?: string, limit?: string } }) {
        try {
            const bookId = params.bookId; 
            const page = parseInt(query.page || '1');
            const limit = parseInt(query.limit || '10');
            const skip = (page - 1) * limit;

            if (!bookId) {
                throw new Error('กรุณาระบุ Book ID');
            }
            
            const [saleDetails, totalCount] = await Promise.all([
                prisma.saleDetail.findMany({
                    where: { bookId: bookId },
                    include: {
                        sale: {
                            include: {
                                admin: { select: { id: true, name: true, username: true } },
                                member: { select: { id: true, name: true, username: true, phone: true } }
                            }
                        },
                        book: { select: { id: true, name: true, isbn: true, category: true, image: true } }
                    },
                    orderBy: { sale: { createdAt: 'desc' } },
                    skip: skip,
                    take: limit
                }),
                prisma.saleDetail.count({ where: { bookId: bookId } })
            ]);

            const totalPages = Math.ceil(totalCount / limit);

            return {
                success: true,
                data: saleDetails,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    limit: limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                },
                message: 'ดึงข้อมูล SaleDetail ตาม Book ID สำเร็จ'
            };
        } catch (error: unknown) { 
            console.error('Error getting sale details by book ID:', error);
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูล SaleDetail: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // ... getSaleDetailById (โค้ดไม่เปลี่ยนแปลง) ...
    static async getSaleDetailById({ params }: { params: { id: string } }) {
        try {
            const id = params.id; // แก้ไข Unused Variable

            if (!id) {
                throw new Error('กรุณาระบุ SaleDetail ID');
            }

            const saleDetail = await prisma.saleDetail.findUnique({
                where: { id: id },
                include: {
                    sale: {
                        include: {
                            admin: { select: { id: true, name: true, username: true, level: true } },
                            member: { select: { id: true, name: true, username: true, phone: true, email: true, points: true } }
                        }
                    },
                    book: true
                }
            });

            if (!saleDetail) {
                throw new Error('ไม่พบข้อมูล SaleDetail');
            }

            return {
                success: true,
                data: saleDetail,
                message: 'ดึงข้อมูล SaleDetail สำเร็จ'
            };
        } catch (error: unknown) { 
            console.error('Error getting sale detail by ID:', error);
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูล SaleDetail: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}