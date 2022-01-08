import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../request/login-request';
import { JwtResponse } from '../response/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public api = environment.api + 'api/login'

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<HttpResponse<JwtResponse>> {
    return this.http.post(this.api, loginRequest, { observe: 'response' });
  }
}

