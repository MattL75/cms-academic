import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deliverable } from '../../models/deliverable.model';

@Injectable({
    providedIn: 'root'
})
export class DeliverableService {

    baseUrl = '/api/deliverable';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getDeliverables(): Observable<Deliverable[]> {
        return this.http.get<Deliverable[]>(this.baseUrl + this.suffix).pipe(
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
