import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private tokenStorage: TokenStorageService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.tokenStorage.getToken();
        

        if (token != null) {
            return true;
        }
        this.router.navigate(['']);

        return false;
    }
}