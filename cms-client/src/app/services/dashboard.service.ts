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

    reportOne(): Observable<{business_line: string, name: string, count: number}[]> {
        return this.http.get<{business_line: string, name: string, count: number}[]>(this.baseUrl + this.suffix + '?num=1');
    }

    reportTwo(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + this.suffix + '?num=2');
    }

    reportThree(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl + this.suffix + '?num=3');
    }

    reportFour(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.baseUrl + this.suffix + '?num=4');
    }

    reportFive(): Observable<{city: string, name: string, client_satisfaction: number}[]> {
        return this.http.get<{city: string, name: string, client_satisfaction: number}[]>(this.baseUrl + this.suffix + '?num=5');
    }
}
