import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private snackbar: SnackbarService) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth']);
            return false;
        } else if (this.auth.getUserRole() !== Role.MANAGER && !this.phpBoolean(this.auth.getCurrentUser().is_admin)) {
            this.snackbar.open('Access denied.', 'Dismiss');
            return false;
        }
        return true;
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
