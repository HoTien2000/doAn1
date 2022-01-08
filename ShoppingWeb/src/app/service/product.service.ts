import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDetailDTO } from '../dto/product-detail-dto';
import { ProductDTO } from '../dto/product-dto';
import { ProductModelUpdateDTO } from '../dto/product-model-update-dto';
import { ProductStatisticDTO } from '../dto/product-statistic-dto';
import { ProductTypeUpdateDTO } from '../dto/product-type-update-dto';
import { Product } from '../model/product';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public api = environment.api + 'api/product/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.api + "find-all", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Product>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  update(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "update", formData, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  public view(id: any): Observable<HttpResponse<ProductDetailDTO>>{
    return this.http.get(`${this.api + "view"}/${id}`, { observe: 'response' });
  }

  updateImage(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "update-image", formData, { observe: 'response' });
  }

  findTop8ProductNews(): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/product-newest", {observe: 'response'});
  }

  findTop8ProductSale(): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/product-sale", {observe: 'response'});
  }

  findByCategory(id:any): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(`${this.api + "all/product-category"}/${id}`, {observe: 'response'});
  }

  findByCategoryAndSale(id:any): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(`${this.api + "all/product-category-sale"}/${id}`, {observe: 'response'});
  }

  public detail(id: any): Observable<HttpResponse<ProductDetailDTO>>{
    return this.http.get(`${this.api + "all/detail"}/${id}`, { observe: 'response' });
  }

  findTByProductLike(param: any): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/product-like", {params: param, observe: 'response'});
  }

  findProductModelDTO(param: any): Observable<HttpResponse<ProductModelUpdateDTO[]>> {
    return this.http.get<ProductModelUpdateDTO[]>(this.api + "product-model", {params: param, observe: 'response'});
  }

  findProductTypeDTO(param: any): Observable<HttpResponse<ProductTypeUpdateDTO[]>> {
    return this.http.get<ProductTypeUpdateDTO[]>(this.api + "product-type", {params: param, observe: 'response'});
  }

  findTop8ProductSellFaster(): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/sell-faster", {observe: 'response'});
  }

  searchNotSale(param: any): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/search-not-sale", {params: param ,observe: 'response'});
  }

  searchSale(param: any): Observable<HttpResponse<ProductDTO[]>> {
    return this.http.get<ProductDTO[]>(this.api + "all/search-sale", {params: param, observe: 'response'});
  }

  search(param: any): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.api + "search", {params: param, observe: 'response'});
  }

  findBySaleGreateThan(param: any): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(this.api + "find-sale", {params: param, observe: 'response'});
  }

  productStatistic(param:any): Observable<HttpResponse<ProductStatisticDTO>> {
    return this.http.get<ProductStatisticDTO>(this.api + "product-statistic", {params: param, observe: 'response'});
  }
}
