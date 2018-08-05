import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manager } from '../../models/manager.model';
import { Employee } from '../../models/employee.model';
import { Contract } from '../../models/contract.model';

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

    public getSupervisedEmployees(id: number): Observable<Employee> {
        return this.http.get<any>(this.baseUrl + '/employee' + this.suffix + `?manager_id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public getManagedContracts(id: number): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + '/contract' + this.suffix + `?manager_id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public getManagedContractsByCategory(id: number, type: string): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + '/contract' + this.suffix + `?manager_id= ${id}&type=${type}`).pipe(
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
