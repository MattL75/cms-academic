import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DepartmentsService {

    baseUrl = '/api/departments';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getDepartments(): Observable<Department[]> {
        return this.http.get<Department[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public addDepartment(department: Department): Observable<Department> {
        return this.http.post<Department>(this.baseUrl + this.suffix, department).pipe(
            catchError(this.handleError)
        );
    }

    public updateDepartment(department: Department): Observable<Department> {
        return this.http.put<Department>(this.baseUrl + this.suffix, department).pipe(
            catchError(this.handleError)
        );
    }

    public deleteDepartment(id: number): Observable<{}> {
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
