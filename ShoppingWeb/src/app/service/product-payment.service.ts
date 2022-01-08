import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductPayment } from '../model/product-payment';

@Injectable({
  providedIn: 'root'
})
export class ProductPaymentService {

  public api = environment.api + 'api/product-payment/'

  constructor(private http: HttpClient) { }

  findByPayment(param: any): Observable<HttpResponse<ProductPayment[]>> {
    return this.http.get<ProductPayment[]>(this.api + "find-by-payment", {params: param, observe: 'response'});
  }
}
