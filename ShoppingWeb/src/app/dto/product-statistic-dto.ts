import { Product } from "../model/product";

export class ProductStatisticDTO {
    products?: Product[];
    quantityProduct?: number;
    quantityImport?: number;
    quantitySell?: number;
    inventory?: number;
}
