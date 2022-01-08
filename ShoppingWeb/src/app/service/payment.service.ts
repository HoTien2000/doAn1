import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticDTO } from '../dto/statistic-dto';
import { Payment } from '../model/payment';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public api = environment.api + 'api/payment/'

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", formData, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>(this.api + "find-all", {observe: 'response'});
  }

  findByUserSystem(): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>(this.api + "find-user", {observe: 'response'});
  }

  public findById(id: any): Observable<HttpResponse<Payment>>{
    return this.http.get(`${this.api + "find-id"}/${id}`, { observe: 'response' });
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  statusOrder(formData: FormData): Observable<HttpResponse<MessageResponse>> {
    return this.http.put(this.api + "status-order", formData, { observe: 'response' });
  }

  search(param: any): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>(this.api + "search", {params: param, observe: 'response'});
  }

  findByStatus(param: any): Observable<HttpResponse<Payment[]>> {
    return this.http.get<Payment[]>(this.api + "find-status", {params: param, observe: 'response'});
  }

  repostStistic(param:any): Observable<HttpResponse<StatisticDTO>> {
    return this.http.get<StatisticDTO>(this.api + "statistic-report", {params: param, observe: 'response'});
  }
}
