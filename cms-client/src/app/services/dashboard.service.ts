import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract.model';
import { Employee } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    baseUrl = '/api/report';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    reportOne(): Observable<{business_line: string, name: string, contracts: number}[]> {
        return this.http.get<{business_line: string, name: string, contracts: number}[]>(this.baseUrl + '/one' + this.suffix);
    }

    reportTwo(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + '/two' + this.suffix);
    }

    reportThree(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl + '/three' + this.suffix);
    }

    reportFour(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + '/four' + this.suffix);
    }

    reportFive(type: string): Observable<{city: string, name: string, client_satisfaction: number}[]> {
        return this.http.get<{city: string, name: string, client_satisfaction: number}[]>(this.baseUrl + '/five' + this.suffix + '?type=' + type);
    }

    reportSix(): Observable<{employees: string}> {
        return this.http.get<{employees: string}>(this.baseUrl + '/six' + this.suffix);
    }

    reportSeven(): Observable<{contracts: string}> {
        return this.http.get<{contracts: string}>(this.baseUrl + '/seven' + this.suffix);
    }

    reportEight(): Observable<{name: string, month_scheduled: string, month_delivered: string}[]> {
        return this.http.get<{name: string, month_scheduled: string, month_delivered: string}[]>(this.baseUrl + '/eight' + this.suffix);
    }
}
