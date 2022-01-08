import { CartDTO } from "./cart-dto";

export class CartTotalDTO {
    cartDTOs?: CartDTO[];
    totalQuantity?: number;
    total?: number;
}
