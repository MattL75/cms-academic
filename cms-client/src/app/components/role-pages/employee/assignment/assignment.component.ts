import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { expandX } from '../../../../animations/expand';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AuthService } from '../../../../services/auth.service';
import { WorkLog } from '../../../../models/work-log.model';
import { ConfirmDialogComponent } from '../../../utils/confirm-dialog/confirm-dialog.component';
import { Role } from '../../../../models/enums/role.enum';
import { Assignment } from '../../../../models/assignment.model';
import { AssignmentService } from '../../../../services/entity/assignment.service';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';

@Component({
    selector: 'cms-assignment',
    templateUrl: './assignment.component.html',
    styleUrls: ['./assignment.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class AssignmentComponent implements OnInit {

    dataSource: MatTableDataSource<Assignment>;
    displayedColumns: string[] = ['employee_id', 'contract_id', 'assignment_id', 'active', 'actions'];
    querying = false;
    openFilter = false;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private assignmentService: AssignmentService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();

        this.dataSource = new MatTableDataSource<Assignment>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(AssignmentDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add an Assignment',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.assignmentService.addAssignment(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Assignment added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(assignment: Assignment): void {
        const dialogRef = this.dialog.open(AssignmentDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, assignment),
                title: 'Edit an Assignment',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.assignmentService.updateAssignment(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Assignment modified.', 'Success!');
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
                content: 'Are you sure you want to delete this assignment?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.assignmentService.deleteAssignment(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Assignment deleted.', 'Success!');
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

    populate(): void {
        this.querying = true;
        if (this.user.role === Role.EMPLOYEE) {
            this.assignmentService.getAssignmentsForEmployee(this.auth.getCurrentUser().id).subscribe(assignments => {
                this.dataSource.data = assignments;
                this.querying = false;
            }, () => {
                this.snackbar.open('Population query failed.', 'Dismiss');
                this.querying = false;
            });
        } else if (this.user.role === Role.MANAGER) {
            this.assignmentService.getAssignmentsForManager(this.auth.getCurrentUser().id).subscribe(assignments => {
                this.dataSource.data = assignments;
                this.querying = false;
            }, () => {
                this.snackbar.open('Population query failed.', 'Dismiss');
                this.querying = false;
            });
        } else if (this.user.is_admin) {
            this.assignmentService.getAssignments().subscribe(assignments => {
                this.dataSource.data = assignments;
                this.querying = false;
            }, () => {
                this.snackbar.open('Population query failed.', 'Dismiss');
                this.querying = false;
            });
        } else {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        }
    }
}