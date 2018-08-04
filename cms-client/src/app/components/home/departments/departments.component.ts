import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Department } from '../../../models/department.model';
import { DepartmentsService } from '../../../services/entity/departments.service';
import { DepartmentsDialogComponent } from './departments-dialog/departments-dialog.component';

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
    displayedColumns: string[] = ['id', 'name', 'service_type', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private departmentService: DepartmentsService) {
    }

    ngOnInit() {
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
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(department: Department): void {
        const dialogRef = this.dialog.open(DepartmentsDialogComponent, {
            width: '450px',
            data: {
                manager: Object.assign({}, department),
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
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
