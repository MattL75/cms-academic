import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/entity/clients.service';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';

@Component({
    selector: 'cms-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ClientsComponent implements OnInit {

    dataSource: MatTableDataSource<Client>;
    displayedColumns: string[] = ['id', 'name', 'province', 'address', 'postal_code', 'email_domain', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private clientService: ClientsService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Client>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(ClientsDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add a Client',
                action: 'Add',
                mode: 'add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.clientService.addClient(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Client added.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public edit(client: Client): void {
        const dialogRef = this.dialog.open(ClientsDialogComponent, {
            width: '450px',
            data: {
                manager: Object.assign({}, client),
                title: 'Edit a Client',
                action: 'Save',
                mode: 'edit'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.clientService.updateClient(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Client modified.', 'Success!');
                }, () => {
                    this.querying = false;
                    this.snackbar.open('Operation failed.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: Client): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this client?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.clientService.deleteClient(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Client deleted.', 'Success!');
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
        this.clientService.getClients().subscribe(clients => {
            this.dataSource.data = clients;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
