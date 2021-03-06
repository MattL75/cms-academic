import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { EmployeesService } from '../../../services/entity/employees.service';
import { EmployeesDialogComponent } from './employees-dialog/employees-dialog.component';
import { Employee } from '../../../models/employee.model';
import { Role } from '../../../models/enums/role.enum';
import { AuthService } from '../../../services/auth.service';

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
    displayedColumns: string[] = ['id', 'first_name', 'insurance', 'province', 'department_id', 'contract_type_preference'];
    querying = false;
    openFilter = false;
    Roles = Role;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private employeesService: EmployeesService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        if (this.user.role === Role.MANAGER || this.phpBoolean(this.user.is_admin)) {
            this.displayedColumns.push('actions');
        }

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
                action: 'Add',
                mode: 'add'
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
                employee: Object.assign({}, employee),
                title: 'Edit an Employee',
                action: 'Save',
                mode: 'edit'
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
            this.snackbar.open('No results found.', 'Dismiss');
            this.querying = false;
        });
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
