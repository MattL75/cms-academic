import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private loggedIn = true;

    constructor(private router: Router) {
    }

    public login(): void {
        this.loggedIn = true;
    }

    public logout(): void {
        this.loggedIn = false;
        this.router.navigate(['auth']);
    }

    public isAuthenticated(): boolean {
        return this.loggedIn;
    }

    public register(): void {
        this.login();
    }
}
