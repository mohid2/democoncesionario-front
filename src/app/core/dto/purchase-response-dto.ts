import { CarPurchaseResponseDto } from "./car-purchase-response-dto";

export interface PurchaseResponseDto {
    invoiceNumber?: number;
    customerDni: string;
    date?: Date;
    total: number
    paymentMethod?: string;
    carPurchaseDTOs: CarPurchaseResponseDto[];
}
