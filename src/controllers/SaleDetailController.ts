import { PrismaClient, Prisma } from "../../generated/prisma"; 

const prisma = new PrismaClient();

// ⭐️ Type Definitions ที่จำเป็น ⭐️

// Type Guard สำหรับตรวจสอบว่า Object มีเมธอด toNumber() หรือไม่
function isDecimal(value: unknown): value is { toNumber: () => number } {
    return typeof value === 'object' && value !== null && 'toNumber' in value && typeof (value as { toNumber: unknown }).toNumber === 'function';
}

// 🎯 Type สำหรับ SaleDetail ที่มีฟิลด์ที่ถูก Include และ Select
type SaleDetailForSummary = {
    // SaleDetail base fields
    id: string; 
    saleId: string;
    bookId: string;
    qty: number;
    price: Prisma.Decimal; 
    createdAt: Date;
    updatedAt: Date;

    // Included Relations
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
    
    // ... getAllSaleDetails โค้ดเดิม ...

    // ดึงรายการ SaleDetail ตาม Sale ID
    static async getSaleDetailsBySaleId({ params }: { params: { saleId: string } }) {
        try {
            const saleId = params.saleId; 

            if (!saleId) {
                throw new Error('กรุณาระบุ Sale ID');
            }

            const saleDetails = await prisma.saleDetail.findMany({
                where: {
                    saleId: saleId
                },
                include: {
                    sale: {
                        include: {
                            admin: {
                                select: { id: true, name: true, username: true, level: true }
                            },
                            member: {
                                select: { id: true, name: true, username: true, phone: true, points: true }
                            }
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
                        // ใช้ Casting ที่ปลอดภัยที่สุด
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

    // ... getSaleDetailsByBookId และ getSaleDetailById โค้ดเดิม (ไม่ได้แสดงในคำตอบนี้เพื่อความกระชับ) ...
}