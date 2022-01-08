import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsDTO } from '../dto/news-dto';
import { ViewPostDTO } from '../dto/view-post-dto';
import { News } from '../model/news';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public api = environment.api + 'api/news/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<News[]>> {
    return this.http.get<News[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<News>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", formData, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  findTop(): Observable<HttpResponse<NewsDTO[]>> {
    return this.http.get<NewsDTO[]>(this.api + "all/find-top", {observe: 'response'});
  }

  public viewPost(id: any): Observable<HttpResponse<ViewPostDTO>>{
    return this.http.get(`${this.api + "all/view-post"}/${id}`, { observe: 'response' });
  }

  public currentPost(id: any): Observable<HttpResponse<News>>{
    return this.http.get(`${this.api + "all/find-id"}/${id}`, { observe: 'response' });
  }

  findByAll(): Observable<HttpResponse<News[]>> {
    return this.http.get<News[]>(this.api + "all/find-all", {observe: 'response'});
  }
}
