import { Product } from "./product";
import { ProductModel } from "./product-model";
import { ProductType } from "./product-type";
import { UserSystem } from "./user-system";

export class Cart {
    id?: number;
    quantity?: number;
    lastUpdate?: string;
    product?: Product;
    productModel?: ProductModel;
    productType?: ProductType
    userSystem?: UserSystem
}
