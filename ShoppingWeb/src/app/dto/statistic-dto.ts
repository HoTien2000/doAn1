import { PaymentDTO } from "./payment-dto";

export class StatisticDTO {
    paymentDTOs?: PaymentDTO[] ;
    totalImport?: number;
    totalSell?: number;
    total?: number;
}
