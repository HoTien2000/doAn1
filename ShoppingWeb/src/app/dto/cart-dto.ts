import { Cart } from "../model/cart";

export class CartDTO {
    cart?: Cart;
    price?: number;
    priceSale?: number;
    sale?: number;
    quantity?: number;
    total?: number;
}
