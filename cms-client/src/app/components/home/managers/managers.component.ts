import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ManagersService } from '../../../services/entity/managers.service';
import { ManagersDialogComponent } from './managers-dialog/managers-dialog.component';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'cms-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss', '../home.component.scss']
})
export class ManagersComponent implements OnInit {

    TEST_DATA: Manager[] = [
        {employeeId: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@doe.com'},
        {employeeId: 2, first_name: 'Rob', last_name: 'Ford', email: 'crack@ford.com'},
        {employeeId: 3, first_name: 'Doug', last_name: 'Ford', email: 'doug@ford.com'},
        {employeeId: 4, first_name: 'Kebab', last_name: 'Kebabo', email: 'kebabo@kebabo.com'},
        {employeeId: 5, first_name: 'Martin', last_name: 'Spasov', email: 'nerd1@kebabo.com'},
        {employeeId: 6, first_name: 'Jesse', last_name: 'Tremblay', email: 'nerd2@kebabo.com'},
        {employeeId: 7, first_name: 'Manel', last_name: 'Guay-Montserrat', email: 'nerd3@kebabo.com'},
        {employeeId: 8, first_name: 'Mathieu', last_name: 'Lajoie', email: 'nerd4@kebabo.com'},
        {employeeId: 9, first_name: 'Richard', last_name: 'Lajoie', email: 'richard@nuance.com'},
        {employeeId: 10, first_name: 'Alain', last_name: 'Ratier', email: 'ratier@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
        {employeeId: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com'},
    ];

    dataSource = new MatTableDataSource<Manager>(this.TEST_DATA);
    displayedColumns: string[] = ['employeeId', 'name', 'email', 'actions'];

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private http: ManagersService) {
    }

    ngOnInit() {
        this.populate();
    }

    public add(): void {
        const dialogRef = this.dialog.open(ManagersDialogComponent, {
            width: '350px',
            data: {
                manager: {first_name: '', last_name: '', email: ''},
                title: 'Add a Manager',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // Create Manager, subscribe, then snackbar inside.
            // Backend generates id, then returns here in subscribe, get new item created
            if (result) {
                this.TEST_DATA.push(result);
                this.populate();
                this.snackbar.open('Manager added.', 'Success!');
            }
        });
    }

    public edit(manager: Manager): void {
        const dialogRef = this.dialog.open(ManagersDialogComponent, {
            width: '350px',
            data: {
                manager: Object.assign({}, manager),
                title: 'Edit a Manager',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // Update manager, subscribe, then snackbar inside.
            if (result) {
                Object.assign(manager, result);
                this.snackbar.open('Manager modified.', 'Success!');
            }
        });
    }

    public delete(element: Manager): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this manager?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Or just repopulate
                this.TEST_DATA.splice(this.TEST_DATA.indexOf(element), 1);
                this.populate();
                this.snackbar.open('Manager deleted.', 'Success!');
            }
        });
    }

    private populate(): void {
        this.dataSource = new MatTableDataSource<Manager>(this.TEST_DATA);
    }
}
