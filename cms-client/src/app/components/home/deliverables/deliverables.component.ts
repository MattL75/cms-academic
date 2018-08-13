import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { expandX } from '../../../animations/expand';
import { Role } from '../../../models/enums/role.enum';
import { AuthService } from '../../../services/auth.service';
import { Deliverable } from '../../../models/deliverable.model';
import { DeliverableService } from '../../../services/entity/deliverable.service';

@Component({
    selector: 'cms-deliverables',
    templateUrl: './deliverables.component.html',
    styleUrls: ['./deliverables.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class DeliverablesComponent implements OnInit {

    dataSource: MatTableDataSource<Deliverable>;
    displayedColumns: string[] = ['contract_name', 'deliv_number', 'is_final', 'days_to_delivery', 'days_taken', 'month_scheduled', 'month_delivered', 'is_active'];
    querying = false;
    openFilter = false;
    Roles = Role;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private deliverableService: DeliverableService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        this.dataSource = new MatTableDataSource<Deliverable>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private populate(): void {
        this.querying = true;
        this.deliverableService.getDeliverables().subscribe(delivs => {
            this.dataSource.data = delivs;
            this.querying = false;
        }, () => {
            this.snackbar.open('No results found.', 'Dismiss');
            this.querying = false;
        });
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
