import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from '../../models/city.model';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    baseUrl = '/api/city';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getCities(): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + this.suffix).pipe(
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
