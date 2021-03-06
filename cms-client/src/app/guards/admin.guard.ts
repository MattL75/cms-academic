import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private snackbar: SnackbarService) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth']);
            return false;
        } else if (this.phpBoolean(this.auth.getCurrentUser().is_admin)) {
            return true;
        }
        this.snackbar.open('Access denied.', 'Dismiss');
        return false;
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
