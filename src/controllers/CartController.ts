import type { CartInterface } from "../interface/CartInterface";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

// ----------------------------------------------------
// กำหนด Type สำหรับ Context/Request Objects 
// เพื่อแทนที่การใช้ 'any' และเพิ่ม Type Safety
// ----------------------------------------------------
interface CartContext {
    jwt: {
        verify: (token: string) => Promise<{ id: string }>; // สมมติว่า payload มี id เป็น string
    };
    request: {
        headers: {
            get: (key: string) => string | null;
        }
    };
    set: {
        status: number | '400' | '401' | '500' | '404'; // Type ที่รองรับ HttpStatus Code และ string
    };
}

export const CartController = {
    add: async ({ body }: { body: CartInterface }) => {
        try {
            const cart = await prisma.cart.findFirst({
                where: {
                    memberId: body.memberId,
                    bookId: body.bookId
                }
            })

            if (cart != null) {
                await prisma.cart.update({
                    where: {
                        id: cart.id
                    },
                    data: {
                        qty: cart.qty + 1
                    }
                })
                return { message: 'success: quantity incremented' };
            } else {
                const newCart = await prisma.cart.create({
                    data: {
                        memberId: body.memberId,
                        bookId: body.bookId,
                        qty: 1
                    }
                })
                return newCart;
            }
        } catch (err) {
            return { error: (err as Error).message || 'Failed to add item to cart' }
        }
    },
    list: async ({ params }: {
        params: {
            memberId: string
        }
    }) => {
        try {
            return await prisma.cart.findMany({
                where: {
                    memberId: params.memberId
                },
                select: {
                    id: true,
                    qty: true,
                    book: true
                }
            })
        } catch (err) {
            return { error: (err as Error).message || 'Failed to list cart items' }
        }
    },
    delete: async ({ params }: {
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.cart.delete({
                where: {
                    id: params.id
                }
            })
            return { message: 'success' }
        } catch (err) {
            return { error: (err as Error).message || 'Failed to delete cart item' }
        }
    },
    upQty: async ({ params }: {
        params: {
            id: string
        }
    }) => {
        try {
            const cart = await prisma.cart.findUnique({
                where: {
                    id: params.id
                }
            })

            if (!cart) {
                return { error: 'Cart item not found' };
            }
            
            // ใช้ increment เพื่อลด race condition
            return await prisma.cart.update({
                data: {
                    qty: {
                        increment: 1
                    }
                },
                where: {
                    id: params.id
                }
            })

        } catch (err) {
            return { error: (err as Error).message || 'Failed to increment quantity' }
        }
    },
    downQty: async ({ params, set }: {
        params: {
            id: string
        },
        set: CartContext['set'] 
    }) => {
        try {
            const cart = await prisma.cart.findUnique({
                where: {
                    id: params.id
                }
            })

            if (!cart) {
                set.status = 404;
                return { error: 'Cart item not found' };
            }

            if (cart.qty - 1 < 1) {
                set.status = 400;
                return { message: 'qty < 1 (use delete to remove the item)' }
            }

            // ใช้ decrement เพื่อลด race condition
            return await prisma.cart.update({
                data: {
                    qty: {
                        decrement: 1
                    }
                },
                where: {
                    id: params.id
                }
            })
        } catch (err) {
            set.status = 500;
            return { error: (err as Error).message || 'Failed to decrement quantity' };
        }
    },
    cartConfirm: async ({ body, jwt, request, set }: {
        body: {
            name: string,
            address: string,
            phone: string,
            points: number
        },
        jwt: CartContext['jwt'], 
        request: CartContext['request'], 
        set: CartContext['set'] 
    }) => {
        try {
            const authHeader = request.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                set.status = 401;
                return { message: 'Authorization token not found or malformed' };
            }
            const token = authHeader.replace('Bearer ', '');
            const payload = await jwt.verify(token);
            
            const memberId = payload.id;
            if (!memberId) {
                set.status = 401;
                return { message: 'Invalid token payload' };
            }

            await prisma.member.update({
                data: {
                    phone: body.phone,
                    name: body.name,
                    address: body.address,
                    points: body.points 
                },
                where: {
                    id: memberId
                }
            })

            return { message: 'success: member info updated' }
        } catch (err) {
            set.status = 500;
            return { error: (err as Error).message || 'Failed to confirm cart and update member info' };
        }
    },
    uploadSlip: async ({ body }: {
        body: {
            myFile: File
        }
    }) => {
        try {
            // ใช้ Bun.write เพื่อบันทึกไฟล์ (เฉพาะในสภาพแวดล้อม Bun)
            const path = 'public/upload/slip/' + body.myFile.name;
            await Bun.write(path, body.myFile);
            return { message: 'success: slip uploaded', filename: body.myFile.name };
        } catch (err) {
            return { error: (err as Error).message || 'Failed to upload slip' };
        }
    },
    confirmOrder: async ({ jwt, request, set, body }: {
        jwt: CartContext['jwt'], 
        request: CartContext['request'], 
        set: CartContext['set'], 
        body: {
            slipName: string,
            points: number
        }
    }) => {
        try {
            const authHeader = request.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                set.status = 401;
                return { message: 'Authorization token not found or malformed' };
            }
            const token = authHeader.replace('Bearer ', '');
            const payload = await jwt.verify(token);
            const memberId = payload.id;
            
            const carts = await prisma.cart.findMany({
                where: { memberId: memberId },
                select: {
                    qty: true,
                    book: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            qty: true,
                            status: true
                        }
                    }
                }
            });

            const member = await prisma.member.findUnique({
                where: { id: memberId },
                select: { 
                    id: true,
                    name: true,
                    address: true,
                    phone: true,
                    points: true 
                }
            });

            if (!member) {
                set.status = 401;
                return { message: 'unauthorized: member not found' }
            }

            if (carts.length === 0) {
                set.status = 400;
                return { message: 'cart is empty' }
            }

            // ตรรกะตรวจสอบแต้มและคำนวณราคา
            const pointsToUse = body.points || 0;
            const totalPrice = carts.reduce((sum, item) => sum + (item.qty * item.book.price), 0);

            if (pointsToUse < 0) {
                set.status = 400;
                return { message: 'Points to use must be a positive number' };
            }
            if (member.points < pointsToUse) {
                set.status = 400;
                return { message: `Insufficient points. You have ${member.points} points.` };
            }
            if (pointsToUse > totalPrice) {
                set.status = 400;
                return { message: `Points to use cannot exceed total price of ${totalPrice}.` };
            }
            
            const finalPrice = totalPrice - pointsToUse;

            // ตรวจสอบสต๊อก
            for (const cart of carts) {
                if (cart.book.status !== 'active') {
                    set.status = 400;
                    return { message: ` "${cart.book.name}" is not available.` };
                }
                if (cart.book.qty < cart.qty) {
                    set.status = 400;
                    return { message: `Insufficient stock for "${cart.book.name}". Only ${cart.book.qty} left.` };
                }
            }

            // ใช้ transaction เพื่อความปลอดภัย (ACID properties)
            const result = await prisma.$transaction(async (tx) => {
                
                // 1. สร้าง Order
                const order = await tx.order.create({
                    data: {
                        createdAt: new Date(),
                        memberId: member.id,
                        customerName: member.name ?? '',
                        customerAddress: member.address ?? '',
                        customerPhone: member.phone ?? '',
                        slipImage: body.slipName,
                        status: 'transfer', 
                        total: finalPrice // ยอดที่ต้องจ่ายจริง
                    }
                });

                // 2. สร้าง Order Detail และตัดสต๊อก
                for (const cart of carts) {
                    await tx.orderDetail.create({
                        data: {
                            price: cart.book.price,
                            qty: cart.qty,
                            bookId: cart.book.id,
                            orderId: order.id
                        }
                    });

                    const updatedBook = await tx.book.update({
                        where: { id: cart.book.id },
                        data: { qty: { decrement: cart.qty } }
                    });

                    if (updatedBook.qty < 0) {
                        // โยน Error เพื่อให้ Transaction Rollback
                        throw new Error(`Insufficient stock for ${cart.book.name}`);
                    }
                }

                // 3. หักแต้มของ Member 
                if (pointsToUse > 0) {
                    await tx.member.update({
                        where: { id: memberId },
                        data: { points: { decrement: pointsToUse } }
                    });
                }

                // 4. ลบสินค้าในตะกร้า
                await tx.cart.deleteMany({
                    where: { memberId: memberId }
                });

                return order;
            });

            return { 
                message: 'success',
                orderId: result.id
            }

        } catch (err: unknown) { // ✅ แก้ไข: ใช้ unknown แทน any
            set.status = 500;
            
            // Type Guard: ดึงข้อความ Error
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            
            // จัดการข้อผิดพลาดสต๊อกที่ถูกโยนมาใน transaction
            if (errorMessage.includes('Insufficient stock')) {
                set.status = 400;
                return { message: errorMessage };
            }
            
            // จัดการข้อผิดพลาดทั่วไป
            return { 
                message: 'internal server error',
                error: errorMessage 
            };
        }
    }
}