import type { CartInterface } from "../interface/CartInterface";
import { PrismaClient } from "../../generated/prisma";
import { file } from "bun";
import { request } from "http";
const prisma = new PrismaClient();

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
            } else {
                await prisma.cart.create({
                    data: {
                        memberId: body.memberId,
                        bookId: body.bookId,
                        qty: 1
                    }
                })
            }
        } catch (err) {
            return { error: err }
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
            return { error: err }
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
            return { error: err }
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

            if (cart) {
                return await prisma.cart.update({
                    data: {
                        qty: cart.qty + 1
                    },
                    where: {
                        id: params.id
                    }
                })
            }
        } catch (err) {
            return { error: err }
        }
    },
    downQty: async ({ params, set }: {
        params: {
            id: string
        },
        set: {
            status: number
        }
    }) => {
        try {
            const cart = await prisma.cart.findUnique({
                where: {
                    id: params.id
                }
            })

            if (cart) {
                if (cart.qty - 1 < 1) {
                    set.status = 400;
                    return { message: 'qty < 1' }
                }

                return await prisma.cart.update({
                    data: {
                        qty: cart.qty - 1
                    },
                    where: {
                        id: params.id
                    }
                })
            }
        } catch (err) {
            set.status = 500;
            return err;
        }
    },
    cartConfirm: async ({ body, jwt, request, set }: {
        body: {
            name: string,
            address: string,
            phone: string,
            points: number
        },
        jwt: any,
        request: any,
        set: {
            status: number
        }
    }) => {
        try {
            const token = request.headers.get('Authorization').replace('Bearer ', '');
            const payload = await jwt.verify(token);

            await prisma.member.update({
                data: {
                    phone: body.phone,
                    name: body.name,
                    address: body.address,
                    points: body.points
                },
                where: {
                    id: payload.id
                }
            })

            return { message: 'success' }
        } catch (err) {
            set.status = 500;
            return err;
        }
    },
    uploadSlip: async ({ body }: {
        body: {
            myFile: File
        }
    }) => {
        const path = 'public/upload/slip/' + body.myFile.name;
        Bun.write(path, body.myFile)
    },
    confirmOrder: async ({ jwt, request, set, body }: {
        jwt: any,
        request: any,
        set: {
            status: number
        },
        body: {
            slipName: string,
            points: number
        }
    }) => {
        try {
            const token = request.headers.get('Authorization').replace('Bearer ', '');
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

            // 1. ดึงข้อมูลแต้มของ Member มาด้วย
            const member = await prisma.member.findUnique({
                where: { id: memberId },
                select: { // เลือกเฉพาะ field ที่จำเป็น
                    id: true,
                    name: true,
                    address: true,
                    phone: true,
                    points: true 
                }
            });

            if (!member) {
                set.status = 401;
                return { message: 'unauthorized' }
            }

            if (carts.length === 0) {
                set.status = 400;
                return { message: 'cart is empty' }
            }

            // 2. เพิ่มตรรกะตรวจสอบแต้ม และคำนวณราคา
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

            // ตรวจสอบสต๊อกและสถานะสินค้าก่อนสร้างออเดอร์ (เหมือนเดิม แต่ใช้ for...of)
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

            // ใช้ transaction เพื่อความปลอดภัย
            const result = await prisma.$transaction(async (tx) => {
                
                // 3. สร้างออเดอร์พร้อมบันทึกราคาสุทธิ (Final Price)
                const order = await tx.order.create({
                    data: {
                        createdAt: new Date(),
                        memberId: member.id,
                        customerName: member.name ?? '',
                        customerAddress: member.address ?? '',
                        customerPhone: member.phone ?? '',
                        slipImage: body.slipName,
                        status: 'transfer', // กำหนดสถานะเริ่มต้น
                        total: finalPrice // บันทึกยอดที่ต้องจ่ายจริง
                    }
                });

                // สร้างรายละเอียดออเดอร์และตัดสต๊อก
                for (const cart of carts) {
                    await tx.orderDetail.create({
                        data: {
                            price: cart.book.price, // บันทึกราคาเต็มต่อชิ้น
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
                        throw new Error(`Insufficient stock for ${cart.book.name}`);
                    }
                }

                // 4. หักแต้มของ Member (ถ้ามีการใช้)
                if (pointsToUse > 0) {
                    await tx.member.update({
                        where: { id: memberId },
                        data: { points: { decrement: pointsToUse } }
                    });
                }

                // ลบสินค้าในตะกร้า
                await tx.cart.deleteMany({
                    where: { memberId: memberId }
                });

                return order;
            });

            return { 
                message: 'success',
                orderId: result.id
            }

        } catch (err: any) {
            set.status = 500;
            
            if (err.message?.includes('Insufficient stock')) {
                set.status = 400;
                return { message: err.message };
            }
            
            return { 
                message: 'internal server error',
                error: err.message || 'unknown error'
            };
        }
    }
}

// confirmOrder: async ({ jwt, request, set, body }: {
//     jwt: any,
//     request: any,
//     set: {
//         status: number
//     },
//     body: {
//         slipName: string
//     }
// }) => {
//     try {
//         const token = request.headers.get('Authorization').replace('Bearer ', '');
//         const payload = await jwt.verify(token);
//         const memberId = payload.id;
        
//         const carts = await prisma.cart.findMany({
//             where: {
//                 memberId: memberId
//             },
//             select: {
//                 qty: true,
//                 book: {
//                     select: {
//                         id: true,
//                         name: true,
//                         price: true,
//                         qty: true,
//                         status: true
//                     }
//                 }
//             }
//         });

//         const member = await prisma.member.findUnique({
//             where: {
//                 id: memberId
//             }
//         });

//         if (!member) {
//             set.status = 401;
//             return { message: 'unauthorized' }
//         }

//         if (carts.length === 0) {
//             set.status = 400;
//             return { message: 'cart is empty' }
//         }

//         // ตรวจสอบสต๊อกและสถานะสินค้าก่อนสร้างออเดอร์
//         for (let i = 0; i < carts.length; i++) {
//             const cart = carts[i];
            
//             // ตรวจสอบสถานะสินค้า
//             if (cart.book.status !== 'active') {
//                 set.status = 400;
//                 return { 
//                     message: ' not available',
//                     book: cart.book.name,
//                     status: cart.book.status
//                 }
//             }

//             // ตรวจสอบสต๊อก
//             if (cart.book.qty < cart.qty) {
//                 set.status = 400;
//                 return { 
//                     message: 'insufficient stock',
//                     book: cart.book.name,
//                     availableStock: cart.book.qty,
//                     requestedQty: cart.qty
//                 }
//             }
//         }

//         // ใช้ transaction เพื่อความปลอดภัย
//         const result = await prisma.$transaction(async (tx) => {
//             // สร้างออเดอร์
//             const order = await tx.order.create({
//                 data: {
//                     createdAt: new Date(),
//                     trackCode: '',
//                     customerName: member.name ?? '',
//                     customerAddress: member.address ?? '',
//                     customerPhone: member.phone ?? '',
//                     memberId: member.id,
//                     slipImage: body.slipName
//                 }
//             });

//             // สร้างรายละเอียดออเดอร์และตัดสต๊อกพร้อมกัน
//             for (let i = 0; i < carts.length; i++) {
//                 const cart = carts[i];

//                 // สร้างรายละเอียดออเดอร์
//                 await tx.orderDetail.create({
//                     data: {
//                         price: cart.book.price,
//                         qty: cart.qty,
//                         bookId: cart.book.id,
//                         orderId: order.id
//                     }
//                 });

//                 // ตัดสต๊อกหนังสือ (ตรวจสอบอีกครั้งในระหว่าง transaction)
//                 const updatedBook = await tx.book.update({
//                     where: {
//                         id: cart.book.id
//                     },
//                     data: {
//                         qty: {
//                             decrement: cart.qty
//                         }
//                     }
//                 });

//                 // ตรวจสอบว่าสต๊อกไม่ติดลบ
//                 if (updatedBook.qty < 0) {
//                     throw new Error(`Insufficient stock for ${cart.book.name}`);
//                 }
//             }

//             // ลบสินค้าในตะกร้า
//             await tx.cart.deleteMany({
//                 where: {
//                     memberId: memberId
//                 }
//             });

//             return order;
//         });

//         return { 
//             message: 'success',
//             orderId: result.id
//         }

//     } catch (err: any) {
//         set.status = 500;
        
//         // ส่งข้อความข้อผิดพลาดที่เข้าใจได้
//         if (err.message && err.message.includes('Insufficient stock')) {
//             set.status = 400;
//             return { message: err.message };
//         }
        
//         return { 
//             message: 'internal server error',
//             error: err.message || 'unknown error'
//         };
//     }
// }