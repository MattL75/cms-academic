import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    baseUrl = '/api/report';
    suffix = '.php';

    constructor(private http: HttpClient) {
    }

    reportOne(): Observable<any> {
        return this.http.get(this.baseUrl + this.suffix + '?num=1');
    }

    reportTwo(): Observable<any> {
        return this.http.get(this.baseUrl + this.suffix + '?num=2');
    }

    reportThree(): Observable<any> {
        return this.http.get(this.baseUrl + this.suffix + '?num=3');
    }

    reportFour(): Observable<any> {
        return this.http.get(this.baseUrl + this.suffix + '?num=4');
    }

    reportFive(): Observable<any> {
        return this.http.get(this.baseUrl + this.suffix + '?num=5');
    }
}
