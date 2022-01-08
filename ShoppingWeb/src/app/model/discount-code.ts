import { UserSystem } from "./user-system";

export class DiscountCode {
    id?: number;
    discountCode?: string;
    discount?: number;
    lastUpdate?: string;
    status?: number;
    userSystem?: UserSystem;
}
