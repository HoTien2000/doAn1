import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../model/product-type';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  public api = environment.api + 'api/product-type/'

  constructor(private http: HttpClient) { }

  create(productType: ProductType): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", productType, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<ProductType[]>> {
    return this.http.get<ProductType[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<ProductType>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(productType: ProductType): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", productType, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
