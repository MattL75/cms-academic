import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manager } from '../../models/manager.model';
import { Employee } from '../../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class ManagersService {

    baseUrl = '/api/manager';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.baseUrl + this.suffix).pipe(
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

    public getSupervisedEmployees(id?: number): Observable<Employee[]> {
        if (id) {
            return this.http.get<Employee[]>(this.baseUrl + '/employee' + this.suffix + `?manager_id=${id}`).pipe(
                catchError(this.handleError)
            );
        } else {
            return this.http.get<Employee[]>(this.baseUrl + '/employee' + this.suffix).pipe(
                catchError(this.handleError)
            );
        }
    }

    public addSupervisedEmployee(supervises: {man_id: number, emp_id: number}): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/employee' + this.suffix, {manager_id: supervises.man_id, employee_id: supervises.emp_id}).pipe(
            catchError(this.handleError)
        );
    }

    public deleteSupervisedEmployee(supervises: {man_id: number, emp_id: number}): Observable<any> {
        return this.http.delete<any>(this.baseUrl + '/employee' + this.suffix + `?manager_id=${supervises.man_id}&employee_id=${supervises.emp_id}`).pipe(
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
