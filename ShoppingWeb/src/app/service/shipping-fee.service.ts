import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShippingFee } from '../model/shipping-fee';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ShippingFeeService {

  public api = environment.api + 'api/shipping-fee/'

  constructor(private http: HttpClient) { }

  create(shippingFee: ShippingFee): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", shippingFee, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<ShippingFee[]>> {
    return this.http.get<ShippingFee[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<ShippingFee>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(shippingFee: ShippingFee): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", shippingFee, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  findByAdress(): Observable<HttpResponse<ShippingFee>> {
    return this.http.get<ShippingFee>(this.api + "find-address", {observe: 'response'});
  }
}
