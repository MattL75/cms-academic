import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    baseUrl = '/api/users';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + this.suffix, user).pipe(
            catchError(this.handleError)
        );
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.baseUrl + this.suffix, user).pipe(
            catchError(this.handleError)
        );
    }

    public deleteUser(id: number): Observable<{}> {
        return this.http.delete(this.baseUrl + this.suffix + `?id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
