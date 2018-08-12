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
        return this.http.get<{business_line: string, name: string, count: number}[]>(this.baseUrl + '/one' + this.suffix);
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

    reportFive(): Observable<{city: string, name: string, client_satisfaction: number}[]> {
        return this.http.get<{city: string, name: string, client_satisfaction: number}[]>(this.baseUrl + '/five' + this.suffix);
    }

    reportSix(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/six' + this.suffix);
    }

    reportSeven(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/seven' + this.suffix);
    }

    reportEight(): Observable<any> {
        return this.http.get<any>(this.baseUrl + '/eight' + this.suffix);
    }
}
