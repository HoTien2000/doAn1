import { Payment } from "./payment";

export class ProductPayment {
    id?: number;
    catecoryName?: string;
    productName?: string;
    productId?: number;
    model?: string;
    type?: string;
    price?: number;
    priceSale?: number;
    sale?: number;
    quantity?: number;
    total?: number;
    payment?: Payment;
}
