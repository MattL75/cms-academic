import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manager } from '../../models/manager.model';

@Injectable({
    providedIn: 'root'
})
export class ManagersService {

    baseUrl = '/api/managers';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public getMyEmployees(id: number): Observable<any> {
        return this.http.get<any>('/api/worksin' + this.suffix + `?manager_id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public addManager(manager: Manager): Observable<Manager> {
        return this.http.post<Manager>(this.baseUrl + this.suffix, manager).pipe(
            catchError(this.handleError)
        );
    }

    public updateManager(manager: Manager): Observable<Manager> {
        return this.http.put<Manager>(this.baseUrl + this.suffix, manager).pipe(
            catchError(this.handleError)
        );
    }

    public deleteManager(id: number): Observable<{}> {
        return this.http.delete(this.baseUrl + this.suffix + `?id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
