import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Assignment } from '../../models/assignment.model';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {

    baseUrl = '/api/assignment';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    // Use for an admin viewing assignment page
    public getAssignments(): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(this.baseUrl + this.suffix).pipe(
            catchError(this.handleError)
        );
    }

    // Use for a manager viewing assignment page
    public getAssignmentsForManager(id: number): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(this.baseUrl + this.suffix + `?manager_id=${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Use for an employee viewing assignment page
    public getAssignmentsForEmployee(id: number): Observable<Assignment[]> {
        return this.http.get<Assignment[]>(this.baseUrl + this.suffix + `?employee_id=${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public addAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.post<Assignment>(this.baseUrl + this.suffix, assignment).pipe(
            catchError(this.handleError)
        );
    }

    public updateAssignment(assignment: Assignment): Observable<Assignment> {
        return this.http.put<Assignment>(this.baseUrl + this.suffix, assignment).pipe(
            catchError(this.handleError)
        );
    }

    public deleteAssignment(id: number): Observable<{}> {
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
