import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/enums/role.enum';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

    rolesWithProfiles: string[] = [Role.EMPLOYEE, Role.MANAGER, Role.CLIENT];

    constructor(private auth: AuthService, private router: Router, private snackbar: SnackbarService) {
    }

    canActivate(): boolean {
        for (let i = 0; i < this.rolesWithProfiles.length; ++i) {
            if (this.rolesWithProfiles[i] === this.auth.getUserRole()) {
                return true;
            }
        }
        this.snackbar.open('Access denied.', 'Dismiss');
        return false;
    }
}
