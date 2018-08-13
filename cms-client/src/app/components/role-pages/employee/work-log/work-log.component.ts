import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { expandX } from '../../../../animations/expand';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AuthService } from '../../../../services/auth.service';
import { WorkLog } from '../../../../models/work-log.model';
import { WorkLogService } from '../../../../services/entity/work-log.service';
import { ConfirmDialogComponent } from '../../../utils/confirm-dialog/confirm-dialog.component';
import { WorkLogDialogComponent } from './work-log-dialog/work-log-dialog.component';
import { Role } from '../../../../models/enums/role.enum';

@Component({
    selector: 'cms-work-log',
    templateUrl: './work-log.component.html',
    styleUrls: ['./work-log.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class WorkLogComponent implements OnInit {

    dataSource: MatTableDataSource<WorkLog>;
    displayedColumns: string[] = ['employee_id', 'date_worked', 'hours_worked', 'assignment_id'];
    querying = false;
    openFilter = false;
    currentContent = 'employee';
    user;
    Roles = Role;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private workService: WorkLogService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        if (this.phpBoolean(this.user.is_admin)) {
            this.displayedColumns.push('actions');
        }

        this.dataSource = new MatTableDataSource<WorkLog>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(WorkLogDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add a Work Log',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.workService.addWorkLog(result).subscribe(() => {
                    this.switchContent(this.currentContent);
                    this.snackbar.open('Work log added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(worklog: WorkLog): void {
        const dialogRef = this.dialog.open(WorkLogDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, worklog),
                title: 'Edit a Work Log',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.workService.updateWorkLog(result).subscribe(() => {
                    this.switchContent(this.currentContent);
                    this.snackbar.open('Work log modified.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: WorkLog): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this work log?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.workService.deleteWorkLog(element.id).subscribe(() => {
                    this.switchContent(this.currentContent);
                    this.snackbar.open('Work log deleted.', 'Success!');
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

    switchContent(role: string): void {
        if (this.user.role !== Role.MANAGER) {
            this.snackbar.open('Access denied.', 'Dismiss');
            return;
        }
        this.querying = true;
        if (role === 'manager') {
            this.workService.getWorkLogsForManager(this.auth.getCurrentUser().id).subscribe(worklogs => {
                this.dataSource.data = worklogs;
                this.currentContent = 'manager';
                this.querying = false;
            }, () => {
                this.snackbar.open('No results found for manager mode.', 'Dismiss');
                this.querying = false;
            });
        } else if (role === 'employee') {
            this.workService.getWorkLogsForEmployee(this.auth.getCurrentUser().id).subscribe(worklogs => {
                this.dataSource.data = worklogs;
                this.currentContent = 'employee';
                this.querying = false;
            }, () => {
                this.snackbar.open('No results found for employee mode.', 'Dismiss');
                this.querying = false;
            });
        } else {
            this.snackbar.open('An error occurred.', 'Dismiss');
        }
    }

    populate(): void {
        this.querying = true;
        if (this.phpBoolean(this.user.is_admin)) {
            this.workService.getWorkLogs().subscribe(worklogs => {
                this.dataSource.data = worklogs;
                this.querying = false;
            }, () => {
                this.snackbar.open('No results found.', 'Dismiss');
                this.querying = false;
            });
        } else if (this.user.role === Role.EMPLOYEE) {
            this.workService.getWorkLogsForEmployee(this.auth.getCurrentUser().id).subscribe(worklogs => {
                this.dataSource.data = worklogs;
                this.currentContent = 'employee';
                this.querying = false;
            }, () => {
                this.snackbar.open('No results found.', 'Dismiss');
                this.querying = false;
            });
        } else if (this.user.role === Role.MANAGER) {
            this.workService.getWorkLogsForManager(this.auth.getCurrentUser().id).subscribe(worklogs => {
                this.dataSource.data = worklogs;
                this.currentContent = 'manager';
                this.querying = false;
            }, () => {
                this.snackbar.open('No results found.', 'Dismiss');
                this.querying = false;
            });
        } else {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        }
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
