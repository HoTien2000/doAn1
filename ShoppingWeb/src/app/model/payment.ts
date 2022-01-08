import { UserSystem } from "./user-system";

export class Payment {
    id?: number;
    lastUpdate?: string;
    shipingAddress?: string;
    shippingFee?: number;
    discountCode?: string;
    totalDiscount?: number;
    totalQuantity?: number;
    total?: number;
    status?: number;
    userSystem?: UserSystem;
}
