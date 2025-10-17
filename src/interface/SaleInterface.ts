export interface SaleInterface {
    adminId: string;
    memberId?: string;
    paymentMethod: string;
    items: {
        bookId: string;
        qty: number;
    }[];
    pointsToRedeem?: number;
    cashPaid: number;
}