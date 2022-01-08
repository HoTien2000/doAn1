import { CategoryNews } from "./category-news";
import { UserSystem } from "./user-system";

export class News {
    id?: number;
    title?: string;
    content?: string;
    image?: string;
    rootLink?: string;
    lastUpdate?: string;
    categoryNews?: CategoryNews;
    userSystem?: UserSystem;
}
