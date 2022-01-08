import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Introduction } from '../model/introduction';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {

  public api = environment.api + 'api/introduction/'

  constructor(private http: HttpClient) { }

  create(introduction: Introduction): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", introduction, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Introduction[]>> {
    return this.http.get<Introduction[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Introduction>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(introduction: Introduction): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", introduction, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  findByAll(): Observable<HttpResponse<Introduction[]>> {
    return this.http.get<Introduction[]>(this.api + "all/find-all", {observe: 'response'});
  }

}
