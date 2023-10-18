import { DatePipe } from "@angular/common";
import { CarPurchaseRequestDto } from "./car-purchase-request-dto";

export interface PurchaseDto {
    invoiceNumber?: number;
    customerDni: string;
    date?: Date;
    total: number
    paymentMethod?: string;
    carPurchaseDTOs: CarPurchaseRequestDto[];
}
