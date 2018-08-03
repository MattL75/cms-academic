import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth']);
            return false;
        } else if (!this.auth.getCurrentUser().is_admin) {
            return false;
        }
        return true;
    }
}
