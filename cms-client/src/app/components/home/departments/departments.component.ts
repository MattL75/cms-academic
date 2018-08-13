import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Department } from '../../../models/department.model';
import { DepartmentsService } from '../../../services/entity/departments.service';
import { DepartmentsDialogComponent } from './departments-dialog/departments-dialog.component';
import { Role } from '../../../models/enums/role.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class DepartmentsComponent implements OnInit {

    dataSource: MatTableDataSource<Department>;
    displayedColumns: string[] = ['id', 'name', 'service_type'];
    querying = false;
    openFilter = false;
    Roles = Role;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private departmentService: DepartmentsService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        if (this.user.role === Role.MANAGER || this.phpBoolean(this.user.is_admin)) {
            this.displayedColumns.push('actions');
        }

        this.dataSource = new MatTableDataSource<Department>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(DepartmentsDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add a Department',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.departmentService.addDepartment(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Department added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(department: Department): void {
        const dialogRef = this.dialog.open(DepartmentsDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, department),
                title: 'Edit a Department',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.departmentService.updateDepartment(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Department modified.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: Department): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this department?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.departmentService.deleteDepartment(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Department deleted.', 'Success!');
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
        this.departmentService.getDepartments().subscribe(departments => {
            this.dataSource.data = departments;
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
