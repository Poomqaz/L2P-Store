
import { ImportToStockInterface } from "./ImportToStockInterface"

export interface BookInterface {
    id: string,
    name: string,
    price: number
    description: string
    isbn: string
    createdAt: Date
    image: File | string
    category: string
    qty: number
    ImportToStock: ImportToStockInterface[]
    sumImportToStock: number
    status: string
    averageRating: number | null; 
    reviewCount: number; 
}