import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public api = environment.api + 'api/role/'

  constructor(private http: HttpClient) { }

  findByName(req: any): Observable<HttpResponse<Role>> {
    return this.http.get<Role>(this.api + "role-name", {params: req, observe: 'response'});
  }
}

