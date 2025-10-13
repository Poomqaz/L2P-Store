export interface ReviewInterface{
    bookId: string;
    memberId: string;
    rating: number;
    comment: string;
    memberName?: string;
    createdAt: string;
}