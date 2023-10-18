export interface CarPurchaseResponseDto {
    invoiceNumber: number
    referenceCar: string;
    carBrandDescription?: string
    price?:number
    quantity: number
    total: number
}
