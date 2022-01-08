import { Category } from "../model/category";
import { ProductModel } from "../model/product-model";
import { ProductType } from "../model/product-type";
import { UserSystem } from "../model/user-system";

export class ProductDTO {
    id?: number;
    productName?: string;
    introduce?: string;
    description?: string;
    priceImport?: number;
    priceSell?: number;
    quantityImport?: number;
    quantitySell?: number;
    inventory?: number;
    sale?: number;
    lastUpdate?: string;
    image?: string;
    productModels?: ProductModel[];
    productTypes?: ProductType[];
    category?: Category;
    userSystem?: UserSystem;
}
