import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkLog } from '../../models/work-log.model';

@Injectable({
    providedIn: 'root'
})
export class WorkLogService {

    baseUrl = '/api/hours';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    public getWorkLogs(): Observable<WorkLog[]> {
        return this.http.get<WorkLog[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    public getWorkLogsForEmployee(id: number): Observable<WorkLog[]> {
        return this.http.get<WorkLog[]>(this.baseUrl + this.suffix + `?employee_id= ${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public addWorkLog(worklog: WorkLog): Observable<WorkLog> {
        return this.http.post<WorkLog>(this.baseUrl + this.suffix, worklog).pipe(
            catchError(this.handleError)
        );
    }

    public updateWorkLog(worklog: WorkLog): Observable<WorkLog> {
        return this.http.put<WorkLog>(this.baseUrl + this.suffix, worklog).pipe(
            catchError(this.handleError)
        );
    }

    public deleteWorkLog(id: number): Observable<{}> {
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
