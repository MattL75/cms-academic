import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../../services/snackbar.service';
import { expandX } from '../../../../animations/expand';
import { AuthService } from '../../../../services/auth.service';
import { ManagersService } from '../../../../services/entity/managers.service';

@Component({
    selector: 'cms-client-managers',
    templateUrl: './client-managers.component.html',
    styleUrls: ['./client-managers.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ClientManagersComponent implements OnInit {

    dataSource: MatTableDataSource<{first_name: string, last_name: string, rating: number}>;
    displayedColumns: string[] = ['first_name', 'average'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private managersService: ManagersService, private auth: AuthService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<{first_name: string, last_name: string, rating: number}>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private populate(): void {
        this.querying = true;
        this.managersService.getClientManagers(this.auth.getCurrentUser().id).subscribe(managers => {
            this.dataSource.data = managers;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
