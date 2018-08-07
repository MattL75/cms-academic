import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    baseUrl = '/api/client';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl + this.suffix, client).pipe(
            catchError(this.handleError)
        );
    }

    public updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(this.baseUrl + this.suffix, client).pipe(
            catchError(this.handleError)
        );
    }

    public deleteClient(id: number): Observable<{}> {
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
