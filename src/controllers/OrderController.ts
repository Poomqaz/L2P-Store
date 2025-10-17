import { PrismaClient } from "../../generated/prisma";

// ⭐️ Type Definitions ที่จำเป็น ⭐️
interface ResponseSet {
    status: number;
    headers?: Record<string, string>;
}

interface CustomError extends Error {
    message: string;
    status?: number;
}

const prisma = new PrismaClient();

export const OrderController = {
    list: async ({ set }: { set: ResponseSet }) => {
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
            return { error: (err as CustomError).message || 'Failed to retrieve order list' };
        }
    },
    
    cancel: async({ set, params }: {
        set: ResponseSet,
        params: {
            id: string
        }
    }) => {
        try {
            const order = await prisma.order.findUnique({
                where: { id: params.id }
            });

            if (!order) {
                set.status = 404;
                return { message: 'Order not found' };
            }

            if (order.status === 'send' || order.status === 'success' || order.status === 'cancel') {
                set.status = 400;
                return { message: `Cannot cancel order with status: ${order.status}` };
            }

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

            const result = await prisma.$transaction(async (tx) => {
                // 1. คืนสต๊อกสินค้า
                for (const detail of orderDetails) {
                    await tx.book.update({
                        where: { id: detail.bookId },
                        data: { qty: { increment: detail.qty } }
                    });
                }

                // 2. คำนวณและคืนแต้มที่ใช้ไป
                const totalPrice = orderDetails.reduce((sum: number, detail) => {
                    // 💡 แก้ไข: ลบ .toNumber() ออก, ใช้ค่า price โดยตรง (สมมติว่าเป็น number)
                    return sum + (detail.qty * (detail.price as number)); 
                }, 0);
                
                // 💡 แก้ไข: ลบ .toNumber() ออก, ใช้ order.total โดยตรง (สมมติว่าเป็น number)
                const pointsUsed = totalPrice - (order.total as number); 

                if (pointsUsed > 0 && order.memberId) {
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
                    stockReturned: orderDetails.map((detail) => ({
                        bookId: detail.bookId,
                        bookName: detail.Book?.name || 'Unknown',
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

        } catch (err) {
            console.error('Cancel order error:', err);
            set.status = 500;
            return { 
                message: 'internal server error',
                error: (err as CustomError).message || 'unknown error'
            };
        }
    },
    
    paid: async({ set, params }: {
        set: ResponseSet,
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
            return { message: 'Order status updated to paid' };
        } catch (err) {
            set.status = 500;
            return { error: (err as CustomError).message || 'Failed to update order status' };
        }
    },
    
    send: async ({ set, body }: {
        set: ResponseSet,
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

                if (order.status === 'send') {
                    throw new Error('Order already sent');
                }

                // ✅ คำนวณยอดรวมใหม่จาก OrderDetail
                const totalAmount = order.OrderDetail.reduce((sum, item) => {
                    // 💡 แก้ไข: ลบ .toNumber() ออก, ใช้ item.Book?.price โดยตรง (สมมติว่าเป็น number)
                    const bookPrice = (item.Book?.price as number) || 0; 
                    return sum + (item.qty * bookPrice);
                }, 0);

                console.log('Calculated total amount:', totalAmount);

                // อัปเดต order status
                await tx.order.update({
                    where: { id: body.orderId },
                    data: {
                        trackCode: body.traceCode,
                        express: body.express,
                        remark: body.remark,
                        status: 'send',
                    }
                });

                // ✅ คำนวณแต้ม
                const pointsToAdd = Math.floor(totalAmount / 100);
                console.log('Points to add:', pointsToAdd);

                if (pointsToAdd > 0 && order.memberId) {
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
                    console.log('No points to add (total < 100 or no memberId)');
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
                error: err instanceof Error ? (err as CustomError).message : 'Unknown error'
            };
        }
    }
}