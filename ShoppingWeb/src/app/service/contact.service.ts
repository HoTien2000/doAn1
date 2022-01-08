import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../model/contact';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public api = environment.api + 'api/contact/'

  constructor(private http: HttpClient) { }

  create(contact: Contact): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "all/save", contact, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Contact[]>> {
    return this.http.get<Contact[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Contact>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
