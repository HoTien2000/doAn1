import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardAdmin {
    roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;

    constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.tokenStorageService.getToken();

        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.body.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            //this.showModeratorBoard = this.roles.includes('ROLE_USER');
        }

        if (token != null && this.showAdminBoard) {
            return true;
        }
        this.router.navigate(['']);

        return false;
    }
}
