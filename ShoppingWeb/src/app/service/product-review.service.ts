import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductReview } from '../model/product-review';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  public api = environment.api + 'api/product-review/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findByProduct(param: any): Observable<HttpResponse<ProductReview[]>> {
    return this.http.get<ProductReview[]>(this.api + "find-product", {params: param, observe: 'response'});
  }
}
