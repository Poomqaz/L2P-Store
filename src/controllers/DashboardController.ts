import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

// Helper: ชื่อเดือนภาษาไทยสำหรับกราฟ
const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

// Interface สำหรับ Type-Safety ของ Context
interface DashboardContext {
    query: {
        month?: string,
        year?: string,
        category?: string
    },
    set: {
        status: number
    }
}

export const DashboardController = {
    list: async ({ 
        query,
        set 
    }: DashboardContext) => { // ใช้ Interface ที่ชัดเจน
        try {
            // --- 1. การดึงข้อมูลสรุปหลักแบบขนาน (Summary Card) ---
            const [
                totalOrder, 
                totalMember, 
                totalIncomeResult, 
                totalSaleCount, 
                totalSaleIncomeResult,
                categories,
                topProductsOnline,
                topProductsSale
            ] = await Promise.all([
                prisma.order.count(),
                prisma.member.count(),
                prisma.orderDetail.aggregate({
                    _sum: { price: true },
                    where: { Order: { status: { not: 'cancel' } } }
                }),
                prisma.sale.count(),
                prisma.sale.aggregate({
                    _sum: { total: true }
                }),
                prisma.book.findMany({
                    select: { category: true },
                    distinct: ['category'],
                    where: { category: { not: null } }
                }),
                // ดึงข้อมูลสินค้าขายดีออนไลน์
                prisma.orderDetail.groupBy({
                    by: ['bookId'],
                    _sum: { qty: true, price: true },
                    where: { Order: { status: { not: 'cancel' } } }
                }),
                // ดึงข้อมูลสินค้าขายดีหน้าร้าน
                prisma.saleDetail.groupBy({
                    by: ['bookId'],
                    _sum: { qty: true, price: true }
                })
            ]);

            const totalIncome = totalIncomeResult._sum.price || 0;
            const totalSaleIncome = totalSaleIncomeResult._sum.total || 0;
            const totalAllIncome = totalIncome + totalSaleIncome;
            const uniqueCategories = categories
                .map(item => item.category)
                .filter((category): category is string => category !== null);

            // --- 2. การเตรียม Filter และการดึงข้อมูลกราฟ ---
            const currentDate = new Date();
            const selectedYear = query.year ? parseInt(query.year) : currentDate.getFullYear();
            const selectedMonth = query.month ? parseInt(query.month) : null;
            const selectedCategory = query.category || null;

            const monthlyIncome = [];
            
            if (selectedMonth) {
                // แสดงรายได้รายวันในเดือนที่เลือก (Daily View)
                const endDate = new Date(selectedYear, selectedMonth, 0); 
                const daysInMonth = endDate.getDate();
                
                const dailyPromises = [];

                for (let day = 1; day <= daysInMonth; day++) {
                    const dayStart = new Date(selectedYear, selectedMonth - 1, day);
                    const dayEnd = new Date(selectedYear, selectedMonth - 1, day + 1); 
                    
                    // 2.1 รายได้ออนไลน์ 
                    const onlinePromise = prisma.orderDetail.aggregate({
                        _sum: { price: true },
                        where: {
                            Order: { status: { not: 'cancel' }, createdAt: { gte: dayStart, lt: dayEnd } },
                            ...(selectedCategory && { Book: { category: selectedCategory } })
                        }
                    });

                    // 2.2 รายได้หน้าร้าน 
                    const salePromise = prisma.sale.aggregate({
                        _sum: { total: true },
                        where: { 
                            createdAt: { gte: dayStart, lt: dayEnd },
                            ...(selectedCategory && { 
                                details: { 
                                    some: {
                                        book: { // ถูกต้องแล้ว
                                            category: selectedCategory
                                        }
                                    }
                                }
                            })
                        }
                    });

                    dailyPromises.push(Promise.all([onlinePromise, salePromise, day]));
                }
                
                const dailyResults = await Promise.all(dailyPromises);

                for (const [onlineResult, saleResult, day] of dailyResults) {
                    const onlineIncome = onlineResult._sum.price || 0;
                    const saleIncome = saleResult._sum.total || 0;
                    monthlyIncome.push({
                        month: `${day}`,
                        onlineIncome: onlineIncome,
                        saleIncome: saleIncome,
                        income: onlineIncome + saleIncome,
                        year: selectedYear
                    });
                }
                
            } else {
                // แสดงรายได้รายเดือนในปีที่เลือก (Monthly View)
                const monthlyPromises = [];

                for (let month = 0; month < 12; month++) {
                    const startDate = new Date(selectedYear, month, 1);
                    const endDate = new Date(selectedYear, month + 1, 1);
                    
                    // 2.1 รายได้ออนไลน์
                    const onlinePromise = prisma.orderDetail.aggregate({
                        _sum: { price: true },
                        where: {
                            Order: { status: { not: 'cancel' }, createdAt: { gte: startDate, lt: endDate } },
                            ...(selectedCategory && { Book: { category: selectedCategory } })
                        }
                    });

                    // 2.2 รายได้หน้าร้าน
                    const salePromise = prisma.sale.aggregate({
                        _sum: { total: true },
                        where: {
                            createdAt: { gte: startDate, lt: endDate },
                            ...(selectedCategory && { 
                                details: { 
                                    some: {
                                        book: {
                                            category: selectedCategory
                                        }
                                    }
                                }
                            })
                        }
                    });

                    monthlyPromises.push(Promise.all([onlinePromise, salePromise, month]));
                }

                const monthlyResults = await Promise.all(monthlyPromises);

                for (const [onlineResult, saleResult, month] of monthlyResults) {
                    const onlineIncome = onlineResult._sum.price || 0;
                    const saleIncome = saleResult._sum.total || 0;
                    
                    monthlyIncome.push({
                        month: thaiMonths[month],
                        onlineIncome: onlineIncome,
                        saleIncome: saleIncome,
                        income: onlineIncome + saleIncome,
                        year: selectedYear
                    });
                }
            }

            // --- 3. การรวมและประมวลผล Top Products ---
            const combinedProducts = new Map<string, { bookId: string, totalQty: number, totalRevenue: number }>();

            // รวมจาก OrderDetail (ออนไลน์)
            topProductsOnline.forEach(item => {
                const bookId = item.bookId!; // As bookId is in 'by', it shouldn't be null
                combinedProducts.set(bookId, {
                    bookId: bookId,
                    totalQty: item._sum.qty || 0,
                    totalRevenue: item._sum.price || 0
                });
            });

            // รวมจาก SaleDetail (หน้าร้าน)
            topProductsSale.forEach(item => {
                const bookId = item.bookId!; // As bookId is in 'by', it shouldn't be null
                const existing = combinedProducts.get(bookId);
                if (existing) {
                    existing.totalQty += item._sum.qty || 0;
                    existing.totalRevenue += item._sum.price || 0;
                } else {
                    combinedProducts.set(bookId, {
                        bookId: bookId,
                        totalQty: item._sum.qty || 0,
                        totalRevenue: item._sum.price || 0
                    });
                }
            });

            // เรียงลำดับและเอา 5 อันดับแรก
            const topProducts = Array.from(combinedProducts.values())
                .sort((a, b) => b.totalQty - a.totalQty)
                .slice(0, 5);

            // ดึงข้อมูลรายละเอียดของสินค้าขายดีแบบขนาน
            const topProductsWithDetails = await Promise.all(
                topProducts.map(async (product) => {
                    const book = await prisma.book.findUnique({
                        where: { id: product.bookId }
                    });
                    
                    return {
                        id: product.bookId,
                        name: book?.name || '',
                        image: book?.image || '',
                        category: book?.category || '',
                        price: book?.price || 0,
                        totalSold: product.totalQty,
                        totalRevenue: product.totalRevenue
                    };
                })
            );

            // --- 4. การคืนค่าผลลัพธ์ ---
            return {
                totalOrder: totalOrder,
                totalIncome: totalIncome,
                totalSaleCount: totalSaleCount,
                totalSaleIncome: totalSaleIncome,
                totalAllIncome: totalAllIncome,
                totalMember: totalMember,
                monthlyIncome: monthlyIncome,
                topProducts: topProductsWithDetails,
                categories: uniqueCategories,
                selectedFilters: {
                    month: selectedMonth,
                    year: selectedYear,
                    category: selectedCategory
                }
            }
        } catch (err: unknown) { // ✅ ใช้ unknown และจัดการ Error
            console.error('Dashboard list error:', err);
            set.status = 500;
            return { 
                error: 'Internal server error',
                message: err instanceof Error ? err.message : 'An unknown error occurred' 
            };
        }
    },

    // เพิ่มฟังก์ชันสำหรับดึงข้อมูลรายได้ตามช่วงเวลา
    getIncomeByDateRange: async ({ 
        startDate, 
        endDate, 
        set 
    }: {
        startDate: string,
        endDate: string,
        set: { status: number }
    }) => {
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // ดึงข้อมูลแบบขนาน
            const [onlineIncomeResult, saleIncomeResult] = await Promise.all([
                // รายได้ออนไลน์
                prisma.orderDetail.aggregate({
                    _sum: { price: true },
                    where: {
                        Order: {
                            status: { not: 'cancel' },
                            createdAt: { gte: start, lte: end }
                        }
                    }
                }),
                // รายได้หน้าร้าน
                prisma.sale.aggregate({
                    _sum: { total: true },
                    where: {
                        createdAt: { gte: start, lte: end }
                    }
                })
            ]);

            const totalOnlineIncome = onlineIncomeResult._sum.price || 0;
            const totalSaleIncome = saleIncomeResult._sum.total || 0;

            return {
                onlineIncome: totalOnlineIncome,
                saleIncome: totalSaleIncome,
                totalIncome: totalOnlineIncome + totalSaleIncome,
                startDate,
                endDate
            };
        } catch (err: unknown) { // ✅ ใช้ unknown และจัดการ Error
            console.error('Income by date range error:', err);
            set.status = 500;
            return { 
                error: 'Internal server error',
                message: err instanceof Error ? err.message : 'An unknown error occurred' 
            };
        }
    }
}