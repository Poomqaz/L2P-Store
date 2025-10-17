import { error } from "console";
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

import type { BookInterface } from "../interface/BookInterface";
import { describe } from "bun:test";

export const BookController = {
    create: async ({ body }: { body: BookInterface }) => {
        try {
            const imageName = body.image.name;
            const image = body.image;
            const book = await prisma.book.create({
                data: {
                    name: body.name,
                    price: parseInt(body.price.toString()),
                    isbn: body.isbn,
                    description: body.description,
                    category: body.category,
                    qty: parseInt(body.qty?.toString() || '0'),
                    image: imageName
                }
            })

            Bun.write('public/uploads/' + imageName, image);

            return book
        } catch (err) {
            console.log(err);
            return { error: err }
        }
    },
    list: async () => {
        try {
            return await prisma.book.findMany({
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    status: 'active'
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isbn: true,
                    description: true,
                    image: true,
                    category: true,
                    qty: true,
                    averageRating: true, 
                    reviewCount: true,
                    ImportToStock: {
                        select: {
                            id: true,
                            qty: true,
                            createdAt: true,
                            updateAt: true
                        }
                    }
                }
            });
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    // 
    update: async ({ params, body }: {
        params: { id: string },
        body: BookInterface
    }) => {
        try {
            const oldBook = await prisma.book.findUnique({
                where: { id: params.id }
            });

            // ตรวจสอบก่อนว่า image ที่ส่งมาเป็นไฟล์จริงไหม
            const imageName = (body.image && typeof body.image !== "string")
                ? body.image.name
                : oldBook?.image || '';

            const image = (body.image && typeof body.image !== "string")
                ? body.image
                : null;

            if (image) {
                const file = Bun.file("public/uploads/" + oldBook?.image);
                if (await file.exists()) {
                    await file.delete();
                }
                Bun.write('public/uploads/' + imageName, image);
            }

            // *** 🔑 การแก้ไข #1: เตรียมค่า Qty ใหม่ และคำนวณส่วนต่าง ***
            const newQty = parseInt(body.qty?.toString() || '0');
            const oldQty = oldBook?.qty ?? 0;
            const diffQty = newQty - oldQty; 

            // *** 🔑 การแก้ไข #2: บันทึกส่วนต่างลงใน ImportToStock (Audit Trail) ***
            if (diffQty !== 0) {
                await prisma.importToStock.create({
                    data: {
                        bookid: params.id,
                        qty: diffQty, // บันทึกส่วนต่าง (เป็นบวกสำหรับการเพิ่ม, เป็นลบสำหรับการลด)
                    }
                });
                // การดำเนินการนี้จะรักษาความสมบูรณ์ของประวัติสต็อก (ImportToStock)
                // แม้ว่าการเปลี่ยนแปลงจะเกิดขึ้นจากการแก้ไขรายละเอียดสินค้า
            }

            // *** 🔑 การแก้ไข #3: อัปเดตข้อมูลในตาราง Book (รวมถึง qty) ***
            const updateData: any = {
                name: body.name,
                price: parseInt(body.price.toString()),
                isbn: body.isbn,
                description: body.description,
                category: body.category,
                qty: newQty, // เขียนทับค่า qty ใหม่ที่ผู้ใช้ส่งมา
            };

            // เพิ่ม imageName เข้าไปใน updateData หากมีการเปลี่ยนแปลงรูปภาพ
            if (imageName) {
                updateData.image = imageName;
            }

            const book = await prisma.book.update({
                data: updateData,
                where: { id: params.id }
            });

            return book;
        } catch (err) {
            console.error(err);
            return { error: err };
        }
    },
    delete: async ({ params }: {
        params: {
            id: string
        }
    }) => {
        try {
            const oldBook = await prisma.book.findUnique({
                where: {
                    id: params.id
                }
            })

            if (oldBook?.image != null) {
                const filePath = 'public/uploads/' + oldBook.image;
                const file = Bun.file(filePath);

                if (await file.exists()) {
                    await file.delete();
                }
            }

            await prisma.book.update({
                where: { id: params.id },
                data: { status: 'inactive' }
            });

            return { message: 'success' }
        } catch (error) {
            return { error: error }
        }
    },
    importToStock: async ({ body }: {
        body: {
            bookId:string
            qty: number
        }
    }) => {
        try {
            const book = await prisma.book.findUnique({
                where: {
                    id: body.bookId
                }
            })

            if (!book) {
                return { error: 'Book not found'}
            }

            await prisma.importToStock.create({
                data: {
                    bookid: body.bookId,
                    qty: body.qty
                }
            })

            await prisma.book.update({
                where: { id: body.bookId },
                data: {
                    qty: {
                        increment: body.qty // เพิ่มจำนวนตามที่นำเข้า
                    }
                }
            });
            
            return { message: 'suscess'};
        } catch (err) {
            return err;
        }
    },
    // ในไฟล์ Backend (เช่น ในไฟล์ Route Handler หรือ BookService/Controller ของคุณ)
    historyImportToStock: async ({ params }: {
        // กำหนดให้รับ bookId จาก URL parameters
        params: { bookId: string } 
    }) => {
        try {
            const bookId = params.bookId;
            
            // 1. ตรวจสอบว่ามี bookId ถูกส่งมาหรือไม่
            if (!bookId) {
                return { error: 'Book ID is required' };
            }

            // 2. ดึงข้อมูลประวัติการนำเข้าทั้งหมดสำหรับสินค้านี้
            const history = await prisma.importToStock.findMany({
                where: {
                    // bookid ในตาราง ImportToStock ต้องตรงกับ bookId ที่ส่งมา
                    bookid: bookId 
                },
                // เรียงลำดับจากล่าสุดไปเก่าสุด
                orderBy: {
                    createdAt: 'desc' 
                }
            });

            // 3. ส่งข้อมูลประวัติกลับไป
            return history; 
            
        } catch (err) {
            // จัดการข้อผิดพลาดทั่วไป เช่น การเชื่อมต่อฐานข้อมูล
            return { error: 'Failed to fetch import history', details: err };
        }
    },
    addCategory: async ({ body }: {
        body: {
            bookId: string;
            newCategory: string;
        };
    }) => {
        try {
            // 1. Validate input
            if (!body.bookId || !body.newCategory) {
                return { error: 'BookId and newCategory are required' };
            }

            const trimmedCategory = body.newCategory.trim();
            if (trimmedCategory === '') {
                return { error: 'Category cannot be empty' };
            }

            // 2. ดึงข้อมูลหนังสือปัจจุบัน
            const book = await prisma.book.findUnique({
                where: { id: body.bookId },
                select: { id: true, category: true }
            });

            if (!book) {
                return { error: 'Book not found' };
            }

            // 3. แปลงหมวดหมู่เป็น array และกรองค่าว่าง
            let existingCategories: string[] = [];
            if (book.category && book.category.trim() !== '') {
                existingCategories = book.category
                    .split(',')
                    .map(c => c.trim())
                    .filter(c => c !== ''); // กรองค่าว่างออก
            }

            // 4. ตรวจสอบว่าหมวดหมู่ใหม่มีอยู่แล้วหรือไม่ (case-insensitive)
            const categoryExists = existingCategories.some(
                cat => cat.toLowerCase() === trimmedCategory.toLowerCase()
            );

            if (categoryExists) {
                return { 
                    error: 'Category already exists',
                    data: { currentCategories: existingCategories }
                };
            }

            // 5. เพิ่มหมวดหมู่ใหม่
            existingCategories.push(trimmedCategory);

            // 6. รวมหมวดหมู่เป็น string
            const updatedCategoryString = existingCategories.join(', '); // เพิ่มช่องว่างหลัง comma

            // 7. อัปเดตข้อมูลในฐานข้อมูล
            const updatedBook = await prisma.book.update({
                where: { id: body.bookId },
                data: {
                    category: updatedCategoryString,
                },
                select: {
                    id: true,
                    name: true,
                    category: true
                }
            });

            return { 
                message: 'Category added successfully', 
                data: {
                    bookId: updatedBook.id,
                    bookName: updatedBook.name,
                    categories: updatedBook.category?.split(', ') || []
                }
            };

        } catch (err) {
            console.error('Error in addCategory:', err);
            return { 
                error: 'Failed to add category',
                details: err instanceof Error ? err.message : 'Unknown error'
            };
        }
    }
}