import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { expandX } from '../../../../animations/expand';
import { Employee } from '../../../../models/employee.model';
import { SnackbarService } from '../../../../services/snackbar.service';
import { ManagersService } from '../../../../services/entity/managers.service';
import { SupervisedDialogComponent } from './supervised-dialog/supervised-dialog.component';
import { ConfirmDialogComponent } from '../../../utils/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'cms-supervised',
    templateUrl: './supervised.component.html',
    styleUrls: ['./supervised.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class SupervisedComponent implements OnInit {

    dataSource: MatTableDataSource<Employee>;
    displayedColumns: string[] = ['id', 'first_name', 'province', 'contract_type_preference', 'actions'];
    querying = false;
    openFilter = false;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private managerService: ManagersService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        this.dataSource = new MatTableDataSource<Employee>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(SupervisedDialogComponent, {
            width: '450px',
            data: {
                id: this.user.id,
                is_admin: this.user.is_admin,
                title: 'Add a Relationship',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.managerService.addSupervisedEmployee(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Relationship added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: Employee): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this relationship?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.managerService.deleteSupervisedEmployee({man_id: this.user.id, emp_id: element.id}).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Employee deleted.', 'Success!');
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
        this.managerService.getSupervisedEmployees(this.user.id).subscribe(employees => {
            this.dataSource.data = employees;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
