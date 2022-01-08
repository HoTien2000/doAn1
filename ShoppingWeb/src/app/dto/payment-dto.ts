import { UserSystem } from "../model/user-system";

export class PaymentDTO {
    id?: number;
    lastUpdate?: string;
    shipingAddress?: string;
    shippingFee?: number;
    discountCode?: string;
    totalDiscount?: number;
    totalQuantity?: number;
    total?: number;
    actualMoney?: number;
    status?: number;
    userSystem?: UserSystem;
}
