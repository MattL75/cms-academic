import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class AuthService {

    public querying = false;

    private loggedIn = true;
    private currentUser;
    private baseUrl = '/api/login';
    private suffix = '.php';

    constructor(private http: HttpClient, private router: Router, private snackbar: SnackbarService) {
    }

    public login(username: string, password: string): void {
        this.querying = true;
        this.http.post<any>(this.baseUrl + this.suffix, {username: username, password: password}).pipe(
                catchError(this.handleError)
        ).subscribe((user: any) => {
            this.currentUser = user;
            this.loggedIn = true;
            this.querying = false;
            this.router.navigate(['home']);
        }, () => {
            this.querying = false;
            this.snackbar.open('Invalid username or password.', 'Dismiss');
        });
    }

    public logout(): void {
        this.querying = true;
        this.http.delete(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        ).subscribe(() => {
            this.loggedIn = false;
            this.querying = false;
            this.router.navigate(['auth']);
        }, () => {
            this.querying = false;
            this.snackbar.open('Failed to logout.', 'Dismiss');
        });
    }

    public isAuthenticated(): boolean {
        return this.loggedIn;
    }

    public register(username: string, password: string): void {
        this.querying = true;
        this.http.post('/api/register' + this.suffix, {username: username, password: password}).pipe(
            catchError(this.handleError)
        ).subscribe((user: any) => {
            this.currentUser = user;
            this.querying = false;
            this.loggedIn = true;
            this.router.navigate(['home']);
        }, () => {
            this.querying = false;
            this.snackbar.open('Failed to register.', 'Dismiss');
        });
    }

    public getCurrentUser(): any {
        return this.currentUser;
    }

    public getUserRole(): string {
        return this.currentUser.role;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred: ', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
