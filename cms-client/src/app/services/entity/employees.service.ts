import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {

    baseUrl = '/api/employee';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public getSpecificEmployee(id: number): Observable<Employee> {
        return this.http.get<Employee>(this.baseUrl + this.suffix + '?id=' + id).pipe(
            catchError(this.handleError)
        );
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseUrl + this.suffix, employee).pipe(
            catchError(this.handleError)
        );
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(this.baseUrl + this.suffix, employee).pipe(
            catchError(this.handleError)
        );
    }

    public deleteEmployee(id: number): Observable<{}> {
        return this.http.delete(this.baseUrl + this.suffix + `?id=${id}`).pipe(
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
