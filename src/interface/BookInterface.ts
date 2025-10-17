export interface BookInterface {
    id: string,
    name: string,
    price: number
    description: string
    isbn: string
    createdAt: Date
    image: File
    category: string
    qty: number
    status: string
}
