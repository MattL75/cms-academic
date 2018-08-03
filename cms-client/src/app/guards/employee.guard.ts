import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(): boolean {
        // TODO remove
        return true;

        // if (!this.auth.isAuthenticated()) {
        //     this.router.navigate(['auth']);
        //     return false;
        // } else if (this.auth.getCurrentUser().role !== Role.EMPLOYEE && this.auth.getCurrentUser().role !== Role.MANAGER && this.auth.getCurrentUser().is_admin === false) {
        //     return false;
        // }
        // return true;
    }
}
