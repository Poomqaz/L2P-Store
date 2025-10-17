// import { PrismaClient } from "../../generated/prisma";

// const prisma = new PrismaClient();

// export const DashboardController = {
//     list: async ({ set }: {
//         set: {
//             status: number
//         }
//     }) => {
//         try {
//             const totalOrder = await prisma.order.aggregate({
//                 _count: {
//                     id: true
//                 }
//             });
//             const orders = await prisma.order.findMany({
//                 where: {
//                     status: {
//                         not: 'cancel'
//                     }
//                 }
//             });
            
//             let totalIncome = 0;

//             for (let i = 0; i < orders.length; i++) {
//                 const orderDetails = await prisma.orderDetail.findMany({
//                     where: {
//                         orderId: orders[i].id
//                     }
//                 })
//                 for (let j = 0; j < orderDetails.length; j++) {
//                     const orderDetail = orderDetails[j];
//                     const price = orderDetail.price;
//                     const qty = orderDetail.qty;
//                     const amount = qty*price;

//                     totalIncome += amount;
//                 }
//             }

//             const totalMember = await prisma.member.count();

//             return {
//                 totalOrder: totalOrder,
//                 totalIncome: totalIncome,
//                 totalMember: totalMember
//             }
//         } catch (err) {
//             set.status = 500;
//             return err;
//         }
//     }
// }

// import { PrismaClient } from "../../generated/prisma";

// const prisma = new PrismaClient();

// export const DashboardController = {
//     list: async ({ set }: {
//         set: {
//             status: number
//         }
//     }) => {
//         try {
//             // ดึงข้อมูลรวม
//             const totalOrder = await prisma.order.count();
            
//             const totalMember = await prisma.member.count();

//             // ดึงข้อมูลรายได้รวมแบบ optimized
//             const totalIncomeResult = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         }
//                     }
//                 }
//             });

//             const totalIncome = totalIncomeResult._sum.price || 0;

//             // ดึงข้อมูลรายได้รายเดือน (12 เดือนย้อนหลัง)
//             const currentDate = new Date();
//             const monthlyIncome = [];
            
//             for (let i = 11; i >= 0; i--) {
//                 const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
//                 const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
                
//                 // คำนวณรายได้ในเดือนนั้นๆ
//                 const monthlyIncomeResult = await prisma.orderDetail.aggregate({
//                     _sum: {
//                         price: true
//                     },
//                     where: {
//                         Order: {
//                             status: {
//                                 not: 'cancel'
//                             },
//                             createdAt: {
//                                 gte: date,
//                                 lt: nextMonth
//                             }
//                         }
//                     }
//                 });

//                 const thaiMonths = [
//                     'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
//                     'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
//                 ];

//                 monthlyIncome.push({
//                     month: thaiMonths[date.getMonth()],
//                     income: monthlyIncomeResult._sum.price || 0,
//                     year: date.getFullYear()
//                 });
//             }

//             return {
//                 totalOrder: totalOrder,
//                 totalIncome: totalIncome,
//                 totalMember: totalMember,
//                 monthlyIncome: monthlyIncome
//             }
//         } catch (err) {
//             console.error('Dashboard error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     },

//     // เพิ่มฟังก์ชันสำหรับดึงข้อมูลรายได้ตามช่วงเวลา
//     getIncomeByDateRange: async ({ 
//         startDate, 
//         endDate, 
//         set 
//     }: {
//         startDate: string,
//         endDate: string,
//         set: { status: number }
//     }) => {
//         try {
//             const income = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         },
//                         createdAt: {
//                             gte: new Date(startDate),
//                             lte: new Date(endDate)
//                         }
//                     }
//                 }
//             });

//             return {
//                 income: income._sum.price || 0,
//                 startDate,
//                 endDate
//             };
//         } catch (err) {
//             console.error('Income by date range error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     }
// }

// import { PrismaClient } from "../../generated/prisma";

// const prisma = new PrismaClient();

// export const DashboardController = {
//     list: async ({ 
//         query,
//         set 
//     }: {
//         query: {
//             month?: string,
//             year?: string,
//             category?: string
//         },
//         set: {
//             status: number
//         }
//     }) => {
//         try {
//             // ดึงข้อมูลรวม
//             const totalOrder = await prisma.order.count();
//             const totalMember = await prisma.member.count();

//             // ดึงข้อมูลรายได้รวม
//             const totalIncomeResult = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         }
//                     }
//                 }
//             });
//             const totalIncome = totalIncomeResult._sum.price || 0;

//             // สร้าง filter สำหรับกราฟ
//             const currentDate = new Date();
//             const selectedYear = query.year ? parseInt(query.year) : currentDate.getFullYear();
//             const selectedMonth = query.month ? parseInt(query.month) : null;
//             const selectedCategory = query.category || null;

//             // ดึงข้อมูลรายได้ตาม filter
//             const monthlyIncome = [];
            
//             if (selectedMonth) {
//                 // แสดงรายได้รายวันในเดือนที่เลือก
//                 const startDate = new Date(selectedYear, selectedMonth - 1, 1);
//                 const endDate = new Date(selectedYear, selectedMonth, 0);
                
//                 for (let day = 1; day <= endDate.getDate(); day++) {
//                     const dayStart = new Date(selectedYear, selectedMonth - 1, day);
//                     const dayEnd = new Date(selectedYear, selectedMonth - 1, day + 1);
                    
//                     const dailyIncomeResult = await prisma.orderDetail.aggregate({
//                         _sum: {
//                             price: true
//                         },
//                         where: {
//                             Order: {
//                                 status: { not: 'cancel' },
//                                 createdAt: {
//                                     gte: dayStart,
//                                     lt: dayEnd
//                                 }
//                             },
//                             ...(selectedCategory && {
//                                 Book: {
//                                     category: selectedCategory
//                                 }
//                             })
//                         }
//                     });

//                     monthlyIncome.push({
//                         month: `${day}`,
//                         income: dailyIncomeResult._sum.price || 0,
//                         year: selectedYear
//                     });
//                 }
//             } else {
//                 // แสดงรายได้รายเดือนในปีที่เลือก
//                 for (let month = 0; month < 12; month++) {
//                     const startDate = new Date(selectedYear, month, 1);
//                     const endDate = new Date(selectedYear, month + 1, 1);
                    
//                     const monthlyIncomeResult = await prisma.orderDetail.aggregate({
//                         _sum: {
//                             price: true
//                         },
//                         where: {
//                             Order: {
//                                 status: { not: 'cancel' },
//                                 createdAt: {
//                                     gte: startDate,
//                                     lt: endDate
//                                 }
//                             },
//                             ...(selectedCategory && {
//                                 Book: {
//                                     category: selectedCategory
//                                 }
//                             })
//                         }
//                     });

//                     const thaiMonths = [
//                         'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
//                         'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
//                     ];

//                     monthlyIncome.push({
//                         month: thaiMonths[month],
//                         income: monthlyIncomeResult._sum.price || 0,
//                         year: selectedYear
//                     });
//                 }
//             }

//             // ดึงข้อมูลสินค้าขายดี 5 อันดับ
//             const topProducts = await prisma.orderDetail.groupBy({
//                 by: ['bookId'],
//                 _sum: {
//                     qty: true,
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: { not: 'cancel' }
//                     }
//                 },
//                 orderBy: {
//                     _sum: {
//                         qty: 'desc'
//                     }
//                 },
//                 take: 5
//             });

//             // ดึงข้อมูลรายละเอียดของสินค้าขายดี
//             const topProductsWithDetails = await Promise.all(
//                 topProducts.map(async (product) => {
//                     const book = await prisma.book.findUnique({
//                         where: { id: product.bookId }
//                     });
                    
//                     return {
//                         id: product.bookId,
//                         name: book?.name || '',
//                         image: book?.image || '',
//                         category: book?.category || '',
//                         price: book?.price || 0,
//                         totalSold: product._sum.qty || 0,
//                         totalRevenue: product._sum.price || 0
//                     };
//                 })
//             );

//             // ดึงหมวดหมู่ทั้งหมด
//             const categories = await prisma.book.findMany({
//                 select: {
//                     category: true
//                 },
//                 distinct: ['category'],
//                 where: {
//                     category: {
//                         not: null
//                     }
//                 }
//             });

//             const uniqueCategories = categories
//                 .map(item => item.category)
//                 .filter(category => category !== null);

//             return {
//                 totalOrder: totalOrder,
//                 totalIncome: totalIncome,
//                 totalMember: totalMember,
//                 monthlyIncome: monthlyIncome,
//                 topProducts: topProductsWithDetails,
//                 categories: uniqueCategories,
//                 selectedFilters: {
//                     month: selectedMonth,
//                     year: selectedYear,
//                     category: selectedCategory
//                 }
//             }
//         } catch (err) {
//             console.error('Dashboard error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     },

//     // เพิ่มฟังก์ชันสำหรับดึงข้อมูลรายได้ตามช่วงเวลา
//     getIncomeByDateRange: async ({ 
//         startDate, 
//         endDate, 
//         set 
//     }: {
//         startDate: string,
//         endDate: string,
//         set: { status: number }
//     }) => {
//         try {
//             const income = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         },
//                         createdAt: {
//                             gte: new Date(startDate),
//                             lte: new Date(endDate)
//                         }
//                     }
//                 }
//             });

//             return {
//                 income: income._sum.price || 0,
//                 startDate,
//                 endDate
//             };
//         } catch (err) {
//             console.error('Income by date range error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     }
// }

// import { PrismaClient } from "../../generated/prisma";

// const prisma = new PrismaClient();

// export const DashboardController = {
//     list: async ({ 
//         query,
//         set 
//     }: {
//         query: {
//             month?: string,
//             year?: string,
//             category?: string
//         },
//         set: {
//             status: number
//         }
//     }) => {
//         try {
//             // ดึงข้อมูลรวม
//             const totalOrder = await prisma.order.count();
//             const totalMember = await prisma.member.count();

//             // ดึงข้อมูลรายได้รวมจากออนไลน์
//             const totalIncomeResult = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         }
//                     }
//                 }
//             });
//             const totalIncome = totalIncomeResult._sum.price || 0;

//             // ดึงข้อมูลการขายหน้าร้าน
//             const totalSaleCount = await prisma.sale.count();
//             const totalSaleIncomeResult = await prisma.sale.aggregate({
//                 _sum: {
//                     total: true
//                 }
//             });
//             const totalSaleIncome = totalSaleIncomeResult._sum.total || 0;

//             // รวมรายได้ทั้งหมด
//             const totalAllIncome = totalIncome + totalSaleIncome;

//             // สร้าง filter สำหรับกราฟ
//             const currentDate = new Date();
//             const selectedYear = query.year ? parseInt(query.year) : currentDate.getFullYear();
//             const selectedMonth = query.month ? parseInt(query.month) : null;
//             const selectedCategory = query.category || null;

//             // ดึงข้อมูลรายได้ตาม filter
//             const monthlyIncome = [];
            
//             if (selectedMonth) {
//                 // แสดงรายได้รายวันในเดือนที่เลือก
//                 const startDate = new Date(selectedYear, selectedMonth - 1, 1);
//                 const endDate = new Date(selectedYear, selectedMonth, 0);
                
//                 for (let day = 1; day <= endDate.getDate(); day++) {
//                     const dayStart = new Date(selectedYear, selectedMonth - 1, day);
//                     const dayEnd = new Date(selectedYear, selectedMonth - 1, day + 1);
                    
//                     // รายได้ออนไลน์
//                     const dailyOnlineIncomeResult = await prisma.orderDetail.aggregate({
//                         _sum: {
//                             price: true
//                         },
//                         where: {
//                             Order: {
//                                 status: { not: 'cancel' },
//                                 createdAt: {
//                                     gte: dayStart,
//                                     lt: dayEnd
//                                 }
//                             },
//                             ...(selectedCategory && {
//                                 Book: {
//                                     category: selectedCategory
//                                 }
//                             })
//                         }
//                     });

//                     // รายได้หน้าร้าน
//                     const dailySaleIncomeResult = await prisma.sale.aggregate({
//                         _sum: {
//                             total: true
//                         },
//                         where: {
//                             createdAt: {
//                                 gte: dayStart,
//                                 lt: dayEnd
//                             }
//                         }
//                     });

//                     const onlineIncome = dailyOnlineIncomeResult._sum.price || 0;
//                     const saleIncome = dailySaleIncomeResult._sum.total || 0;

//                     monthlyIncome.push({
//                         month: `${day}`,
//                         onlineIncome: onlineIncome,
//                         saleIncome: saleIncome,
//                         income: onlineIncome + saleIncome,
//                         year: selectedYear
//                     });
//                 }
//             } else {
//                 // แสดงรายได้รายเดือนในปีที่เลือก
//                 for (let month = 0; month < 12; month++) {
//                     const startDate = new Date(selectedYear, month, 1);
//                     const endDate = new Date(selectedYear, month + 1, 1);
                    
//                     // รายได้ออนไลน์
//                     const monthlyOnlineIncomeResult = await prisma.orderDetail.aggregate({
//                         _sum: {
//                             price: true
//                         },
//                         where: {
//                             Order: {
//                                 status: { not: 'cancel' },
//                                 createdAt: {
//                                     gte: startDate,
//                                     lt: endDate
//                                 }
//                             },
//                             ...(selectedCategory && {
//                                 Book: {
//                                     category: selectedCategory
//                                 }
//                             })
//                         }
//                     });

//                     // รายได้หน้าร้าน
//                     const monthlySaleIncomeResult = await prisma.sale.aggregate({
//                         _sum: {
//                             total: true
//                         },
//                         where: {
//                             createdAt: {
//                                 gte: startDate,
//                                 lt: endDate
//                             }
//                         }
//                     });

//                     const thaiMonths = [
//                         'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
//                         'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
//                     ];

//                     const onlineIncome = monthlyOnlineIncomeResult._sum.price || 0;
//                     const saleIncome = monthlySaleIncomeResult._sum.total || 0;

//                     monthlyIncome.push({
//                         month: thaiMonths[month],
//                         onlineIncome: onlineIncome,
//                         saleIncome: saleIncome,
//                         income: onlineIncome + saleIncome,
//                         year: selectedYear
//                     });
//                 }
//             }

//             // ดึงข้อมูลสินค้าขายดี 5 อันดับ (รวมออนไลน์และหน้าร้าน)
//             const topProductsOnline = await prisma.orderDetail.groupBy({
//                 by: ['bookId'],
//                 _sum: {
//                     qty: true,
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: { not: 'cancel' }
//                     }
//                 }
//             });

//             const topProductsSale = await prisma.saleDetail.groupBy({
//                 by: ['bookId'],
//                 _sum: {
//                     qty: true,
//                     price: true
//                 }
//             });

//             // รวมข้อมูลสินค้าขายดีจากทั้งสองช่องทาง
//             const combinedProducts = new Map();

//             topProductsOnline.forEach(item => {
//                 combinedProducts.set(item.bookId, {
//                     bookId: item.bookId,
//                     totalQty: item._sum.qty || 0,
//                     totalRevenue: item._sum.price || 0
//                 });
//             });

//             topProductsSale.forEach(item => {
//                 const existing = combinedProducts.get(item.bookId);
//                 if (existing) {
//                     existing.totalQty += item._sum.qty || 0;
//                     existing.totalRevenue += item._sum.price || 0;
//                 } else {
//                     combinedProducts.set(item.bookId, {
//                         bookId: item.bookId,
//                         totalQty: item._sum.qty || 0,
//                         totalRevenue: item._sum.price || 0
//                     });
//                 }
//             });

//             // เรียงลำดับและเอา 5 อันดับแรก
//             const topProducts = Array.from(combinedProducts.values())
//                 .sort((a, b) => b.totalQty - a.totalQty)
//                 .slice(0, 5);

//             // ดึงข้อมูลรายละเอียดของสินค้าขายดี
//             const topProductsWithDetails = await Promise.all(
//                 topProducts.map(async (product) => {
//                     const book = await prisma.book.findUnique({
//                         where: { id: product.bookId }
//                     });
                    
//                     return {
//                         id: product.bookId,
//                         name: book?.name || '',
//                         image: book?.image || '',
//                         category: book?.category || '',
//                         price: book?.price || 0,
//                         totalSold: product.totalQty,
//                         totalRevenue: product.totalRevenue
//                     };
//                 })
//             );

//             // ดึงหมวดหมู่ทั้งหมด
//             const categories = await prisma.book.findMany({
//                 select: {
//                     category: true
//                 },
//                 distinct: ['category'],
//                 where: {
//                     category: {
//                         not: null
//                     }
//                 }
//             });

//             const uniqueCategories = categories
//                 .map(item => item.category)
//                 .filter(category => category !== null);

//             return {
//                 totalOrder: totalOrder,
//                 totalIncome: totalIncome,
//                 totalSaleCount: totalSaleCount,
//                 totalSaleIncome: totalSaleIncome,
//                 totalAllIncome: totalAllIncome,
//                 totalMember: totalMember,
//                 monthlyIncome: monthlyIncome,
//                 topProducts: topProductsWithDetails,
//                 categories: uniqueCategories,
//                 selectedFilters: {
//                     month: selectedMonth,
//                     year: selectedYear,
//                     category: selectedCategory
//                 }
//             }
//         } catch (err) {
//             console.error('Dashboard error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     },

//     // เพิ่มฟังก์ชันสำหรับดึงข้อมูลรายได้ตามช่วงเวลา
//     getIncomeByDateRange: async ({ 
//         startDate, 
//         endDate, 
//         set 
//     }: {
//         startDate: string,
//         endDate: string,
//         set: { status: number }
//     }) => {
//         try {
//             // รายได้ออนไลน์
//             const onlineIncome = await prisma.orderDetail.aggregate({
//                 _sum: {
//                     price: true
//                 },
//                 where: {
//                     Order: {
//                         status: {
//                             not: 'cancel'
//                         },
//                         createdAt: {
//                             gte: new Date(startDate),
//                             lte: new Date(endDate)
//                         }
//                     }
//                 }
//             });

//             // รายได้หน้าร้าน
//             const saleIncome = await prisma.sale.aggregate({
//                 _sum: {
//                     total: true
//                 },
//                 where: {
//                     createdAt: {
//                         gte: new Date(startDate),
//                         lte: new Date(endDate)
//                     }
//                 }
//             });

//             const totalOnlineIncome = onlineIncome._sum.price || 0;
//             const totalSaleIncome = saleIncome._sum.total || 0;

//             return {
//                 onlineIncome: totalOnlineIncome,
//                 saleIncome: totalSaleIncome,
//                 totalIncome: totalOnlineIncome + totalSaleIncome,
//                 startDate,
//                 endDate
//             };
//         } catch (err) {
//             console.error('Income by date range error:', err);
//             set.status = 500;
//             return { error: 'Internal server error' };
//         }
//     }
// }
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

// Helper: ชื่อเดือนภาษาไทยสำหรับกราฟ
const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

function getBookId<T extends { bookId: any }>(item: T): T['bookId'] {
    return item.bookId;
}

export const DashboardController = {
    list: async ({ 
        query,
        set 
    }: {
        query: {
            month?: string,
            year?: string,
            category?: string
        },
        set: {
            status: number
        }
    }) => {
        try {
            // --- 1. การดึงข้อมูลสรุปหลักแบบขนาน (Summary Card) ---
            const [
                totalOrder, 
                totalMember, 
                totalIncomeResult, 
                totalSaleCount, 
                totalSaleIncomeResult,
                categories
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
                })
            ]);

            const totalIncome = totalIncomeResult._sum.price || 0;
            const totalSaleIncome = totalSaleIncomeResult._sum.total || 0;
            const totalAllIncome = totalIncome + totalSaleIncome;
            const uniqueCategories = categories
                .map(item => item.category)
                .filter((category): category is string => category !== null);

            // --- 2. การเตรียม Filter และการดึงข้อมูลกราฟแบบขนาน ---
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

                    // 2.2 รายได้หน้าร้าน (แก้ไขปัญหา 1: เปลี่ยน Book เป็น book)
                    const salePromise = prisma.sale.aggregate({
                        _sum: { total: true },
                        where: { 
                            createdAt: { gte: dayStart, lt: dayEnd },
                            ...(selectedCategory && { 
                                details: { 
                                    some: {
                                        book: { // <-- แก้ไขตรงนี้: ใช้ 'book' ตัวพิมพ์เล็ก
                                            category: selectedCategory
                                        }
                                    }
                                }
                            })
                        }
                    });

                    dailyPromises.push(Promise.all([onlinePromise, salePromise, day]));
                }
                
                const results = await Promise.all(dailyPromises);

                for (const [dailyOnlineIncomeResult, dailySaleIncomeResult, day] of results) {
                    // แก้ไขปัญหา 2: ใช้ ! เพื่อบอก TypeScript ว่า _sum จะมีอยู่เสมอ (ถึงแม้ค่าข้างในจะเป็น null)
                    const onlineIncome = dailyOnlineIncomeResult._sum!.price || 0; 
                    const saleIncome = dailySaleIncomeResult._sum!.total || 0; // <-- แก้ไขตรงนี้

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
                    
                    // 2.3 รายได้ออนไลน์
                    const onlinePromise = prisma.orderDetail.aggregate({
                        _sum: { price: true },
                        where: {
                            Order: { status: { not: 'cancel' }, createdAt: { gte: startDate, lt: endDate } },
                            ...(selectedCategory && { Book: { category: selectedCategory } })
                        }
                    });

                    // 2.4 รายได้หน้าร้าน (แก้ไขปัญหา 1: เปลี่ยน Book เป็น book)
                    const salePromise = prisma.sale.aggregate({
                        _sum: { total: true },
                        where: { 
                            createdAt: { gte: startDate, lt: endDate },
                            ...(selectedCategory && { 
                                details: {
                                    some: {
                                        book: { // <-- แก้ไขตรงนี้: ใช้ 'book' ตัวพิมพ์เล็ก
                                            category: selectedCategory
                                        }
                                    }
                                }
                            })
                        }
                    });

                    monthlyPromises.push(Promise.all([onlinePromise, salePromise, month]));
                }
                
                const results = await Promise.all(monthlyPromises);

                for (const [monthlyOnlineIncomeResult, monthlySaleIncomeResult, month] of results) {
                    // แก้ไขปัญหา 3: ใช้ ! เพื่อบอก TypeScript ว่า _sum จะมีอยู่เสมอ (ถึงแม้ค่าข้างในจะเป็น null)
                    const onlineIncome = monthlyOnlineIncomeResult._sum!.price || 0;
                    const saleIncome = monthlySaleIncomeResult._sum!.total || 0; // <-- แก้ไขตรงนี้

                    monthlyIncome.push({
                        month: thaiMonths[month],
                        onlineIncome: onlineIncome,
                        saleIncome: saleIncome,
                        income: onlineIncome + saleIncome,
                        year: selectedYear
                    });
                }
            }

            // --- 3. ดึงข้อมูลสินค้าขายดี (Top Products) ---
            const [topProductsOnline, topProductsSale] = await Promise.all([
                prisma.orderDetail.groupBy({
                    by: ['bookId'],
                    _sum: { qty: true, price: true },
                    where: { Order: { status: { not: 'cancel' } } }
                }),
                prisma.saleDetail.groupBy({
                    by: ['bookId'],
                    _sum: { qty: true, price: true }
                })
            ]);
            
            // ... (ส่วนการรวมและดึงรายละเอียดหนังสือ)
            const combinedProducts = new Map<typeof topProductsOnline[0]['bookId'], { 
                bookId: typeof topProductsOnline[0]['bookId'], 
                totalQty: number, 
                totalRevenue: number 
            }>();

            topProductsOnline.forEach(item => {
                combinedProducts.set(item.bookId, { bookId: item.bookId, totalQty: item._sum.qty || 0, totalRevenue: item._sum.price || 0 });
            });

            topProductsSale.forEach(item => {
                const existing = combinedProducts.get(item.bookId);
                if (existing) {
                    existing.totalQty += item._sum.qty || 0;
                    existing.totalRevenue += item._sum.price || 0;
                } else {
                    combinedProducts.set(item.bookId, { bookId: item.bookId, totalQty: item._sum.qty || 0, totalRevenue: item._sum.price || 0 });
                }
            });

            const topProducts = Array.from(combinedProducts.values())
                .sort((a, b) => b.totalQty - a.totalQty)
                .slice(0, 5);

            const bookIds = topProducts.map(p => p.bookId);
            
            const booksDetails = await prisma.book.findMany({
                where: { 
                    id: { in: bookIds as any } 
                }, 
                select: { id: true, name: true, image: true, category: true, price: true }
            });

            const topProductsWithDetails = topProducts.map(product => {
                const book = booksDetails.find(b => b.id === product.bookId);
                
                return {
                    id: product.bookId, 
                    name: book?.name || '',
                    image: book?.image || null,
                    category: book?.category || '',
                    price: book?.price || 0,
                    totalSold: product.totalQty,
                    totalRevenue: product.totalRevenue
                };
            });
            
            // --- 4. Return Final Response ---
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
        } catch (err) {
            console.error('Dashboard error:', err);
            set.status = 500;
            return { error: 'Internal server error' };
        }
    },

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
            const onlineIncomePromise = prisma.orderDetail.aggregate({
                _sum: { price: true },
                where: {
                    Order: { status: { not: 'cancel' }, createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
                }
            });

            const saleIncomePromise = prisma.sale.aggregate({
                _sum: { total: true },
                where: { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
            });
            
            const [onlineIncome, saleIncome] = await Promise.all([onlineIncomePromise, saleIncomePromise]);

            const totalOnlineIncome = onlineIncome._sum.price || 0;
            const totalSaleIncome = saleIncome._sum.total || 0;

            return {
                onlineIncome: totalOnlineIncome,
                saleIncome: totalSaleIncome,
                totalIncome: totalOnlineIncome + totalSaleIncome,
                startDate,
                endDate
            };
        } catch (err) {
            console.error('Income by date range error:', err);
            set.status = 500;
            return { error: 'Internal server error' };
        }
    }
}