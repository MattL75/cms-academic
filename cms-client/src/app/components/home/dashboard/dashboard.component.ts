import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Contract } from '../../../models/contract.model';
import { Employee } from '../../../models/employee.model';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
    selector: 'cms-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    reportOneSource: MatTableDataSource<{business_line: string, name: string, count: number}>;
    reportOneColumns: string[] = ['business_line', 'name', 'count'];

    reportTwoSource: MatTableDataSource<Contract>;
    reportTwoColumns: string[] = ['id', 'name', 'start_date', 'recorded_by', 'department_id', 'client_id', 'manager_id', 'business_line', 'contract_type', 'active'];

    reportThreeSource: MatTableDataSource<Employee>;
    reportThreeColumns: string[] = ['id', 'first_name', 'insurance', 'province', 'department_id', 'contract_type_preference'];

    reportFourSource: MatTableDataSource<Contract>;
    reportFourColumns: string[] = ['id', 'name', 'start_date', 'recorded_by', 'department_id', 'client_id', 'manager_id', 'business_line', 'contract_type', 'active'];

    reportFiveSource: MatTableDataSource<{city: string, name: string, client_satisfaction: number}>;
    reportFiveColumns: string[] = ['city', 'name', 'client_satisfaction'];

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.reportOneSource = new MatTableDataSource<{business_line: string, name: string, count: number}>();
        this.reportTwoSource = new MatTableDataSource<Contract>();
        this.reportThreeSource = new MatTableDataSource<Employee>();
        this.reportFourSource = new MatTableDataSource<Contract>();
        this.reportFiveSource = new MatTableDataSource<{city: string, name: string, client_satisfaction: number}>();

        this.dashboardService.reportOne().subscribe(one => {
            this.reportOneSource.data = one;
        });

        this.dashboardService.reportTwo().subscribe(two => {
            this.reportTwoSource.data = two;
        });

        this.dashboardService.reportThree().subscribe(three => {
            this.reportThreeSource.data = three;
        });

        this.dashboardService.reportFour().subscribe(four => {
            this.reportFourSource.data = four;
        });

        this.dashboardService.reportFive().subscribe(five => {
            this.reportFiveSource.data = five;
        });
    }

}
