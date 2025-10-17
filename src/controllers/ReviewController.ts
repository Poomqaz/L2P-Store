import { PrismaClient } from "../../generated/prisma";
import { Prisma } from '@prisma/client';
import { ReviewInterface } from "../interface/ReviewInterface";

const prisma = new PrismaClient();


export const ReviewController = {
    submitReview: async ({ body }: { body: ReviewInterface }) => {
        const { bookId, memberId, rating, comment } = body;

        if (!bookId || !memberId || rating < 1 || rating > 5) {
            return { 
                error: 'Invalid input: bookId, memberId, and rating (1-5) are required.' 
            };
        }

        try {

            const [newReview, updatedBookStats] = await prisma.$transaction(async (tx) => {
                
                // บันทึก/อัปเดตรีวิว (ใช้ upsert)
                const review = await tx.review.upsert({
                    where: {
                        bookId_memberId: { 
                            bookId: bookId,
                            memberId: memberId,
                        },
                    },
                    update: {
                        rating: rating,
                        comment: comment,
                    },
                    create: {
                        bookId: bookId,
                        memberId: memberId,
                        rating: rating,
                        comment: comment,
                    },
                }); 

                // คำนวณคะแนนเฉลี่ยใหม่
                const reviews = await tx.review.findMany({
                    where: { bookId: bookId },
                    select: { rating: true }
                });

                const reviewCount = reviews.length;
                const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
                
                // คำนวณและปัดเศษ
                const averageRating = reviewCount > 0 
                    ? parseFloat((totalRating / reviewCount).toFixed(1)) 
                    : 0.0; 

                // อัปเดต Book Model
                const updatedBook = await tx.book.update({
                    where: { id: bookId },
                    data: {
                        averageRating: averageRating,
                        reviewCount: reviewCount,
                    },
                    select: {
                        id: true,
                        averageRating: true,
                        reviewCount: true,
                    }
                });

                return [review, updatedBook];
            });
            
            const isNewReview = newReview.createdAt.getTime() === newReview.updatedAt.getTime();
            const message = isNewReview ? 'ส่งรีวิวใหม่สำเร็จ' : 'แก้ไขรีวิวสำเร็จ';

            return { 
                message: message, 
                review: newReview, 
                bookStats: updatedBookStats 
            };

        } catch (err) {
            console.error('Error submitting review:', err);

            if (err instanceof Error) { 
                return { 
                    error: 'Failed to process review.',
                    details: err.message
                };
            }
            return { 
                error: 'An unknown server error occurred.',
                details: 'Unknown error'
            };
        }
    },
    listByBookId: async (c: any) => { // c คือ Context Object ของ Elysia
        const bookId = c.params.bookId as string; // ดึงค่า bookId จาก params เท่านั้น
        
        try {
            const reviews = await prisma.review.findMany({
                where: {
                    // ใช้ bookId ที่ดึงมาจาก params แล้วเท่านั้น
                    bookId: bookId 
                },
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    memberId: true,
                    createdAt: true,
                    member: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            // นำข้อมูล member.name มาใส่ใน memberName และปรับโครงสร้าง
            const reviewsWithMemberName = reviews.map(review => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                memberId: review.memberId,
                createdAt: review.createdAt.toISOString(), // แปลง DateTime ให้เป็น String
                memberName: review.member.name,
            }));

            return reviewsWithMemberName;
        } catch (error) {
            console.error("Error fetching reviews by book ID:", error);
            // โยน error หรือจัดการตามสไตล์ของ Elysia
            throw new Error("Failed to retrieve reviews."); 
        }
    }
}