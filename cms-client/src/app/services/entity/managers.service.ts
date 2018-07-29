import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ManagersService {

    baseUrl = '/api/managers';

    // TODO Modify this when a working api exists

    constructor(private http: HttpClient) {
    }

    public getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.baseUrl).pipe(
            catchError(this.handleError)
        );
    }

    public addManager(manager: Manager): Observable<Manager> {
        return this.http.post<Manager>(this.baseUrl, manager).pipe(
            catchError(this.handleError)
        );
    }

    public updateManager(manager: Manager): Observable<Manager> {
        return this.http.put<Manager>(this.baseUrl, manager).pipe(
            catchError(this.handleError)
        );
    }

    public deleteManager(id: number): Observable<{}> {
        return this.http.delete(this.baseUrl + '/' + id).pipe(
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
