import { Category } from "./category";
import { ProductModel } from "./product-model";
import { ProductType } from "./product-type";
import { UserSystem } from "./user-system";

export class Product {
    id?:number;
    productName?: string;
    introduce?: string;
    description?: string;
    priceImport?: number;
    priceSell?: number;
    quantityImport?: number;
    quantitySell?: number;
    inventory?: number;
    sale?: number;
    productModels?: ProductModel[];
    productTypes?: ProductType[];
    category?: Category;
    lastUpdate?: string;
    userSystem?: UserSystem;
}
