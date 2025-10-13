export interface SaleDetailInterface {
  id: string;
  saleId: string;
  bookId: string;
  qty: number;
  price: number;
  sale: {
    id: string;
    createdAt: string;
    total: number;
    cashPaid: number;
    change: number;
    pointUsed: number;
    paymentMethod: string;
    remark?: string;
    admin: {
      id: string;
      name: string;
      username: string;
      level: string;
    };
    member?: {
      id: string;
      name?: string;
      username: string;
      phone: string;
      points: number;
    };
  };
  book: {
    id: string;
    name: string;
    price: number;
    description?: string;
    isbn?: string;
    image?: string;
    category?: string;
    qty: number;
  };
}