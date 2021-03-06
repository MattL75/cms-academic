import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { SalesAssociate } from '../../../models/sales-associate.model';
import { SalesAssociatesService } from '../../../services/entity/sales-associates.service';
import { SalesAssociatesDialogComponent } from './sales-associates-dialog/sales-associates-dialog.component';
import { Role } from '../../../models/enums/role.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-sales-associates',
    templateUrl: './sales-associates.component.html',
    styleUrls: ['./sales-associates.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class SalesAssociatesComponent implements OnInit {

    dataSource: MatTableDataSource<SalesAssociate>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name'];
    querying = false;
    openFilter = false;
    Roles = Role;
    user;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private salesService: SalesAssociatesService, private auth: AuthService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        if (this.user.role === Role.MANAGER || this.phpBoolean(this.user.is_admin)) {
            this.displayedColumns.push('actions');
        }

        this.dataSource = new MatTableDataSource<SalesAssociate>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(SalesAssociatesDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add an Associate',
                action: 'Add',
                mode: 'add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.salesService.addSalesAssociate(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Associate added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(associate: SalesAssociate): void {
        const dialogRef = this.dialog.open(SalesAssociatesDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, associate),
                title: 'Edit an Associate',
                action: 'Save',
                mode: 'edit'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.salesService.updateSalesAssociate(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Associate modified.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: SalesAssociate): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this associate?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.salesService.deleteSalesAssociate(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Associate deleted.', 'Success!');
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
        this.salesService.getSalesAssociates().subscribe(associates => {
            this.dataSource.data = associates;
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
