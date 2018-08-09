import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/entity/users.service';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';

@Component({
    selector: 'cms-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class UsersComponent implements OnInit {

    dataSource: MatTableDataSource<User>;
    displayedColumns: string[] = ['id', 'username', 'role', 'admin', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private usersService: UsersService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<User>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public edit(user: User): void {
        const dialogRef = this.dialog.open(UsersDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, user),
                title: 'Edit a User',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.usersService.updateUser(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('User modified.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: User): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this user?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.usersService.deleteUser(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('User deleted.', 'Success!');
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
        this.usersService.getUsers().subscribe(users => {
            this.dataSource.data = users;
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
