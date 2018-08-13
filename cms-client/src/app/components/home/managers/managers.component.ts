import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Manager } from '../../../models/manager.model';
import { ManagersService } from '../../../services/entity/managers.service';
import { ManagersDialogComponent } from './managers-dialog/managers-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';

@Component({
    selector: 'cms-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ManagersComponent implements OnInit {

    dataSource: MatTableDataSource<Manager>;
    displayedColumns: string[] = ['id', 'first_name', 'email', 'phone_number', 'middle_initial', 'insurance', 'province', 'department_id'];
    querying = false;
    openFilter = false;
    Roles = Role;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private managersService: ManagersService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        if (this.user.role === Role.MANAGER || this.phpBoolean(this.user.is_admin)) {
            this.displayedColumns.push('actions');
        }

        this.dataSource = new MatTableDataSource<Manager>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(ManagersDialogComponent, {
            width: '450px',
            data: {
                manager: {},
                title: 'Add a Manager',
                action: 'Add',
                mode: 'add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.managersService.addManager(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Manager added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(manager: Manager): void {
        const dialogRef = this.dialog.open(ManagersDialogComponent, {
            width: '450px',
            data: {
                manager: Object.assign({}, manager),
                title: 'Edit a Manager',
                action: 'Save',
                mode: 'edit'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.managersService.updateManager(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Manager modified.', 'Success!');
                }, () => {
                    this.populate();
                    this.snackbar.open('Manager modified with warnings.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: Manager): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this manager?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.managersService.deleteManager(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Manager deleted.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private populate(): void {
        this.querying = true;
        this.managersService.getManagers().subscribe(managers => {
            this.dataSource.data = managers;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
