import { Category } from "../model/category";
import { ProductImage } from "../model/product-image";
import { ProductModel } from "../model/product-model";
import { ProductType } from "../model/product-type";
import { UserSystem } from "../model/user-system";

export class ProductDetailDTO {
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
    productImages?: ProductImage[];
    productModels?: ProductModel[];
    productTypes?: ProductType[];
    category?: Category;
    userSystem?: UserSystem;
}
