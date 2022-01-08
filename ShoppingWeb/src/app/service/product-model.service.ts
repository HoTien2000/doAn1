import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../model/product-model';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {

  public api = environment.api + 'api/product-model/'

  constructor(private http: HttpClient) { }

  create(productModel: ProductModel): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", productModel, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<ProductModel[]>> {
    return this.http.get<ProductModel[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<ProductModel>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(productModel: ProductModel): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", productModel, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }
}
