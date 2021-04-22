import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})

export class HomeGuardService implements CanActivate {

    constructor(private _router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (!this.authService.isLoggedIn) {
            this._router.navigate(['login']);
            return false;
        }
        return true;
    }

}

@Injectable({
    providedIn: 'root'
})

export class LoginGuardService implements CanActivate {

    constructor(private _router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this.authService.isLoggedIn) {
            this._router.navigate(['home']);
            return false;
        }
        return true;
    }

}