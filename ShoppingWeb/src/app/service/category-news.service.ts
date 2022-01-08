import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryNews } from '../model/category-news';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryNewsService {

  public api = environment.api + 'api/category-news/'

  constructor(private http: HttpClient) { }

  create(categoryNews: CategoryNews): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", categoryNews, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<CategoryNews[]>> {
    return this.http.get<CategoryNews[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<CategoryNews>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(categoryNews: CategoryNews): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", categoryNews, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
