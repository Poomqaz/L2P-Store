import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const OrderController = {
    list: async ({ set }: { set: any }) => {
        try {
            return prisma.order.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    OrderDetail: {
                        select: {
                            id: true,
                            qty: true,
                            price: true,
                            Book: {
                                select: {
                                    isbn: true,
                                    name: true
                                }
                            }
                        }
                    },
                    createdAt: true,
                    id: true,
                    customerName: true,
                    customerAddress: true,
                    customerPhone: true,
                    status: true,
                    slipImage: true,
                    trackCode: true,
                    express: true,
                    remark: true,
                    total: true
                }
            })
        } catch (err) {
            set.status = 500;
            return err;
        }
    },
    // cancel: async({ set, params }: {
    //     set: any,
    //     params: {
    //         id: string
    //     }
    // }) => {
    //     try {
    //         await prisma.order.update({
    //             data: {
    //                 status: 'cancel'
    //             },
    //             where: {
    //                 id: params.id
    //             }
    //         })
    //     } catch (err) {
    //         set.status = 500;
    //         return err;
    //     }
    // },
    cancel: async({ set, params }: {
        set: any,
        params: {
            id: string
        }
    }) => {
        try {
            // ดึงข้อมูลออเดอร์พร้อมรายละเอียด
            const order = await prisma.order.findUnique({
                where: { id: params.id }
            });

            if (!order) {
                set.status = 404;
                return { message: 'Order not found' };
            }

            // ตรวจสอบสถานะออเดอร์
            if (order.status === 'success' || order.status === 'cancel') {
                set.status = 400;
                return { message: `Cannot cancel order with status: ${order.status}` };
            }

            // ดึงรายละเอียดออเดอร์
            const orderDetails = await prisma.orderDetail.findMany({
                where: { orderId: params.id },
                include: {
                    Book: true
                }
            });

            if (orderDetails.length === 0) {
                set.status = 400;
                return { message: 'No order details found' };
            }

            // ใช้ transaction เพื่อความปลอดภัย
            const result = await prisma.$transaction(async (tx) => {
                // 1. คืนสต๊อกสินค้า
                for (const detail of orderDetails) {
                    await tx.book.update({
                        where: { id: detail.bookId },
                        data: { qty: { increment: detail.qty } }
                    });
                }

                // 2. คำนวณและคืนแต้มที่ใช้ไป
                const totalPrice = orderDetails.reduce((sum: number, detail: any) => 
                    sum + (detail.qty * detail.price), 0
                );
                const pointsUsed = totalPrice - order.total; // แต้มที่ใช้ = ราคารวม - ราคาที่จ่าย

                if (pointsUsed > 0) {
                    await tx.member.update({
                        where: { id: order.memberId },
                        data: { points: { increment: pointsUsed } }
                    });
                }

                // 3. อัพเดทสถานะออเดอร์
                const canceledOrder = await tx.order.update({
                    where: { id: params.id },
                    data: { status: 'cancel' }
                });

                return { 
                    order: canceledOrder,
                    stockReturned: orderDetails.map((detail: any) => ({
                        bookId: detail.bookId,
                        bookName: detail.book?.name || 'Unknown',
                        qtyReturned: detail.qty
                    })),
                    pointsReturned: pointsUsed
                };
            });

            return {
                message: 'Order canceled successfully',
                orderId: result.order.id,
                stockReturned: result.stockReturned,
                pointsReturned: result.pointsReturned
            };

        } catch (err: any) {
            console.error('Cancel order error:', err); // เพิ่ม logging
            set.status = 500;
            return { 
                message: 'internal server error',
                error: err.message || 'unknown error'
            };
        }
    },
    paid: async({ set, params }: {
        set: any,
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.order.update({
                data: {
                    status: 'paid'
                },
                where: {
                    id: params.id
                }
            })
        } catch (err) {
            set.status = 500;
            return err;
        }
    },
    send: async ({ set, body }: {
        set: { status: number },
        body: {
            traceCode: string,
            express: string,
            remark: string,
            orderId: string
        }
    }) => {
        try {
            console.log('Starting send function for order:', body.orderId);

            const result = await prisma.$transaction(async (tx) => {
                // ดึงข้อมูล order พร้อม OrderDetail + Book
                const order = await tx.order.findUnique({
                    where: { id: body.orderId },
                    include: {
                        OrderDetail: {
                            include: { Book: true }
                        }
                    }
                });

                if (!order) {
                    throw new Error('Order not found');
                }

                console.log('Order found - Total:', order.total, 'Status:', order.status);

                // ตรวจสอบสถานะ
                if (order.status === 'send') {
                    throw new Error('Order already sent');
                }

                // ✅ คำนวณยอดรวมใหม่จาก OrderDetail
                const totalAmount = order.OrderDetail.reduce((sum, item) => {
                    return sum + (item.qty * (item.Book.price || 0));
                }, 0);

                console.log('Calculated total amount:', totalAmount);

                // อัปเดต order status + total
                await tx.order.update({
                    where: { id: body.orderId },
                    data: {
                        trackCode: body.traceCode,
                        express: body.express,
                        remark: body.remark,
                        status: 'send',
                        // total: totalAmount
                    }
                });

                // ✅ คำนวณแต้ม
                const pointsToAdd = Math.floor(totalAmount / 100);
                console.log('Points to add:', pointsToAdd);

                if (pointsToAdd > 0) {
                    // ดึงข้อมูลสมาชิก
                    const currentMember = await tx.member.findUnique({
                        where: { id: order.memberId },
                        select: { points: true, username: true }
                    });

                    if (!currentMember) {
                        throw new Error('Member not found');
                    }

                    const currentPoints = currentMember.points || 0;
                    const newPoints = currentPoints + pointsToAdd;

                    console.log('Updating points for member:', currentMember.username,
                        'Current:', currentPoints, '+', pointsToAdd, '=', newPoints);

                    // อัปเดตแต้มสมาชิก
                    const updatedMember = await tx.member.update({
                        where: { id: order.memberId },
                        data: { points: newPoints }
                    });

                    console.log('Updated member points to:', updatedMember.points);

                    return {
                        success: true,
                        pointsAdded: pointsToAdd,
                        newTotalPoints: updatedMember.points
                    };
                } else {
                    console.log('No points to add (total < 100)');
                    return {
                        success: true,
                        pointsAdded: 0,
                        newTotalPoints: null
                    };
                }
            });

            console.log('Transaction completed successfully');

            return {
                success: true,
                message: `Order sent successfully. Added ${result.pointsAdded} points.`,
                data: {
                    pointsAdded: result.pointsAdded,
                    newTotalPoints: result.newTotalPoints
                }
            };

        } catch (err) {
            console.error('Send function error:', err);
            set.status = 500;
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error'
            };
        }
    }
}