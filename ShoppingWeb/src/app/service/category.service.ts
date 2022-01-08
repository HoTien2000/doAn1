import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public api = environment.api + 'api/category/'

  constructor(private http: HttpClient) { }

  create(category: Category): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", category, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Category>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(category: Category): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", category, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  findByCategory(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(this.api + "all/find-all", {observe: 'response'});
  }

  public findByIdAll(id: any): Observable<HttpResponse<Category>>{
    return this.http.get(`${this.api + "all/find-id"}/${id}`, { observe: 'response' });
  }
}
