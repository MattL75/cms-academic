import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { EmployeesService } from '../../../services/entity/employees.service';
import { EmployeesDialogComponent } from './employees-dialog/employees-dialog.component';
import { Employee } from '../../../models/employee.model';

@Component({
    selector: 'cms-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class EmployeesComponent implements OnInit {

    dataSource: MatTableDataSource<Employee>;
    displayedColumns: string[] = ['id', 'first_name', 'email', 'insurance', 'province', 'department_id', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private employeesService: EmployeesService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Employee>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(EmployeesDialogComponent, {
            width: '450px',
            data: {
                employee: {},
                title: 'Add an Employee',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.employeesService.addEmployee(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Employee added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeesDialogComponent, {
            width: '450px',
            data: {
                manager: Object.assign({}, employee),
                title: 'Edit an Employee',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.employeesService.updateEmployee(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Employee modified.', 'Success!');
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
                content: 'Are you sure you want to delete this employee?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.employeesService.deleteEmployee(element.id).subscribe(() => {
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
        this.employeesService.getEmployees().subscribe(employees => {
            this.dataSource.data = employees;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
