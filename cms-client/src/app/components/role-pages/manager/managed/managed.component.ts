import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { expandX } from '../../../../animations/expand';
import { Contract } from '../../../../models/contract.model';
import { SnackbarService } from '../../../../services/snackbar.service';
import { ManagersService } from '../../../../services/entity/managers.service';
import { AuthService } from '../../../../services/auth.service';
import { ContractType } from '../../../../models/enums/contract-type.enum';

@Component({
    selector: 'cms-managed',
    templateUrl: './managed.component.html',
    styleUrls: ['./managed.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ManagedComponent implements OnInit {

    // ********************************
    // NOT USED - KEEPING IT IN FOR NOW
    // ********************************

    dataSource: MatTableDataSource<Contract>;
    displayedColumns: string[] = ['id', 'acv', 'start_date', 'initial_amount', 'client_satisfaction', 'recorded_by', 'department_id', 'client_id', 'business_line', 'contract_type', 'active'];
    querying = false;
    openFilter = false;
    activeCategory = 'all';
    types = Object.keys(ContractType);

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private managerService: ManagersService, private auth: AuthService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Contract>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    populate(): void {
        // this.querying = true;
        // this.managerService.getManagedContracts(this.auth.getCurrentUser().id).subscribe(contracts => {
        //     this.dataSource.data = contracts;
        //     this.querying = false;
        // }, () => {
        //     this.snackbar.open('Population query failed.', 'Dismiss');
        //     this.querying = false;
        // });
    }

    selectCategory(category: string): void {
        // this.querying = true;
        // this.managerService.getManagedContractsByCategory(this.auth.getCurrentUser().id, category).subscribe(contracts => {
        //     this.dataSource.data = contracts;
        //     this.activeCategory = category;
        //     this.querying = false;
        // }, () => {
        //     this.snackbar.open('Category change failed.', 'Dismiss');
        //     this.querying = false;
        // });
    }
}
