import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SalesAssociate } from '../../models/sales-associate.model';

@Injectable({
    providedIn: 'root'
})
export class SalesAssociatesService {

    baseUrl = '/api/sales';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getSalesAssociates(): Observable<SalesAssociate[]> {
        return this.http.get<SalesAssociate[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public addSalesAssociate(sales: SalesAssociate): Observable<SalesAssociate> {
        return this.http.post<SalesAssociate>(this.baseUrl + this.suffix, sales).pipe(
            catchError(this.handleError)
        );
    }

    public updateSalesAssociate(sales: SalesAssociate): Observable<SalesAssociate> {
        return this.http.put<SalesAssociate>(this.baseUrl + this.suffix, sales).pipe(
            catchError(this.handleError)
        );
    }

    public deleteSalesAssociate(id: number): Observable<{}> {
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
