import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { SecurityService } from '../security/security.service';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const authenticationService = inject(SecurityService)
    const router = inject(Router)
    if(authenticationService.checkLogin()){
        return true;
    } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}