import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForgotPassword } from '../dto/forgot-password';
import { ResetPasswordDTO } from '../dto/reset-password-dto';
import { PasswordResetToken } from '../model/password-reset-token';
import { MessageResponse } from '../response/message-response';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetTokenService {

  public api = environment.api + 'api/forgot-password/'

  constructor(private http: HttpClient) { }

  create(forgotPassword: ForgotPassword): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "save", forgotPassword, { observe: 'response' });
  }

  ressetPassword(resetPasswordDTO: ResetPasswordDTO): Observable<HttpResponse<MessageResponse>> {
    return this.http.post(this.api + "reset-password", resetPasswordDTO, { observe: 'response' });
  }

  findAll(): Observable<HttpResponse<PasswordResetToken[]>> {
    return this.http.get<PasswordResetToken[]>(this.api + "find-all", {observe: 'response'});
  }

  public delete(id: any): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(`${this.api + "delete"}/${id}`, { observe: 'response' });
  }

  public deleteAll(): Observable<HttpResponse<MessageResponse>>{
    return this.http.delete(this.api + "delete-all", {observe: 'response'});
  }

}
