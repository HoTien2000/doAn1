import { Product } from "./product";
import { UserSystem } from "./user-system";

export class ProductReview {
    id?: number;   
    content?: string;
    lastUpdate?: string;
    product?: Product;
    userSystem?: UserSystem;

}
