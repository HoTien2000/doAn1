import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscountCode } from '../model/discount-code';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {

  public api = environment.api + 'api/discount-code/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<DiscountCode[]>> {
    return this.http.get<DiscountCode[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<DiscountCode>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(discountCode: DiscountCode): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", discountCode, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  findDiscountCode(): Observable<HttpResponse<DiscountCode>> {
    return this.http.get<DiscountCode>(this.api + "find-discount-code", {observe: 'response'});
  }

}
