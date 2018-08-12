import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Contract } from '../../../models/contract.model';
import { Employee } from '../../../models/employee.model';
import { DashboardService } from '../../../services/dashboard.service';
import { ContractType } from '../../../models/enums/contract-type.enum';

@Component({
    selector: 'cms-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    reportOneSource: MatTableDataSource<{business_line: string, name: string, contracts: number}>;
    reportOneColumns: string[] = ['business_line', 'name', 'contracts'];

    reportTwoSource: MatTableDataSource<Contract>;
    reportTwoColumns: string[] = ['id', 'name', 'start_date', 'recorded_by', 'department_id', 'client_id', 'manager_id', 'business_line', 'contract_type', 'active'];

    reportThreeSource: MatTableDataSource<Employee>;
    reportThreeColumns: string[] = ['id', 'first_name', 'insurance', 'province', 'department_id', 'contract_type_preference'];

    reportFourSource: MatTableDataSource<Contract>;
    reportFourColumns: string[] = ['id', 'name', 'start_date', 'recorded_by', 'department_id', 'client_id', 'manager_id', 'business_line', 'contract_type', 'active'];

    reportFiveSource: MatTableDataSource<{contract_type: string, details: {city: string, name: string, client_satisfaction: number}}>;
    reportFiveColumns: string[] = ['type', 'city', 'name', 'client_satisfaction'];

    reportSixCount: string;

    reportSevenCount: string;

    reportEightSource: MatTableDataSource<{name: string, month_scheduled: string, month_delivered: string}>;
    reportEightColumns: string[] = ['name', 'month_scheduled', 'month_delivered'];

    types = Object.values(ContractType);

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.reportOneSource = new MatTableDataSource<{business_line: string, name: string, contracts: number}>();
        this.reportTwoSource = new MatTableDataSource<Contract>();
        this.reportThreeSource = new MatTableDataSource<Employee>();
        this.reportFourSource = new MatTableDataSource<Contract>();
        this.reportFiveSource = new MatTableDataSource<{contract_type: string, details: {city: string, name: string, client_satisfaction: number}}>();
        this.reportEightSource = new MatTableDataSource<any>();

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

        this.types.forEach(cType => {
            this.dashboardService.reportFive(cType).subscribe(five => {
                this.reportFiveSource.data.push({contract_type: cType, details: five});
            });
        });

        this.dashboardService.reportSix().subscribe(six => {
            this.reportSixCount = six.employees;
        });

        this.dashboardService.reportSeven().subscribe(seven => {
            this.reportSevenCount = seven.contracts;
        });

        this.dashboardService.reportEight().subscribe(eight => {
            this.reportEightSource.data = eight;
        });
    }

}
