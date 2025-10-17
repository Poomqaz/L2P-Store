import { PrismaClient } from "../../generated/prisma";
import type { ReviewInterface } from "../interface/ReviewInterface";

// ⭐️ Type Definitions ที่แก้ไขแล้ว ⭐️

// 1. Type สำหรับ Params ที่ใช้ใน listByBookId
interface ListByBookIdParams {
    bookId: string;
    // 💡 แก้ไข: เพิ่ม Index Signature เพื่อให้เข้ากับ Record<string, unknown> constraint
    [key: string]: unknown;
}

// 2. Generic Context Type ที่แก้ไข Type Constraint (ใช้ unknown แทน any)
interface ContextType<TParams extends Record<string, unknown> = Record<string, string>> {
    params: TParams;
}

// ----------------------------------------------------------------------

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

                const reviews = await tx.review.findMany({
                    where: { bookId: bookId },
                    select: { rating: true }
                });

                const reviewCount = reviews.length;
                const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
                
                const averageRating = reviewCount > 0 
                    ? parseFloat((totalRating / reviewCount).toFixed(1)) 
                    : 0.0; 

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
    
    // โค้ดนี้ใช้งานได้แล้วโดยไม่มี Error
    listByBookId: async (c: ContextType<ListByBookIdParams>) => { 
        const bookId = c.params.bookId as string; 
        
        try {
            const reviews = await prisma.review.findMany({
                where: {
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

            const reviewsWithMemberName = reviews.map(review => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                memberId: review.memberId,
                createdAt: review.createdAt.toISOString(), 
                memberName: review.member?.name as string || 'Guest', 
            }));

            return reviewsWithMemberName;
        } catch (error) {
            console.error("Error fetching reviews by book ID:", error);
            throw new Error("Failed to retrieve reviews."); 
        }
    }
}