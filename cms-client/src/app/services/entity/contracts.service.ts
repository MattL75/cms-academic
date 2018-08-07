import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../../models/contract.model';

@Injectable({
    providedIn: 'root'
})
export class ContractsService {

    baseUrl = '/api/contract';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getContracts(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public getClientContracts(id: number): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + this.suffix + `?client_id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public getContractsByCategory(type: string): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + this.suffix + `?contract_type=${type}`).pipe(
            catchError(this.handleError)
        );
    }

    public addContract(contract: Contract): Observable<Contract> {
        return this.http.post<Contract>(this.baseUrl + this.suffix, contract).pipe(
            catchError(this.handleError)
        );
    }

    public updateContract(contract: Contract): Observable<Contract> {
        return this.http.put<Contract>(this.baseUrl + this.suffix, contract).pipe(
            catchError(this.handleError)
        );
    }

    public deleteContract(id: number): Observable<{}> {
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
