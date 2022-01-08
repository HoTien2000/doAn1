import { News } from "../model/news";

export class ViewPostDTO {
    news?:News;
    fiveBestNew?:News[];
    related?:News[];
}
