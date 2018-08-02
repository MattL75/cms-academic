import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ManagersService } from '../../../services/entity/managers.service';
import { ManagersDialogComponent } from './managers-dialog/managers-dialog.component';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Manager } from '../../../models/manager.model';

@Component({
    selector: 'cms-managers',
    templateUrl: './managers.component.html',
    styleUrls: ['./managers.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ManagersComponent implements OnInit {

    TEST_DATA: Manager[] = [
        {id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@doe.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 2, first_name: 'Rob', last_name: 'Ford', email: 'crack@ford.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 3, first_name: 'Doug', last_name: 'Ford', email: 'doug@ford.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 4, first_name: 'Kebab', last_name: 'Kebabo', email: 'kebabo@kebabo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 5, first_name: 'Martin', last_name: 'Spasov', email: 'nerd1@kebabo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 6, first_name: 'Jesse', last_name: 'Tremblay', email: 'nerd2@kebabo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 7, first_name: 'Manel', last_name: 'Guay-Montserrat', email: 'nerd3@kebabo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 8, first_name: 'Mathieu', last_name: 'Lajoie', email: 'nerd4@kebabo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 9, first_name: 'Richard', last_name: 'Lajoie', email: 'richard@nuance.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 10, first_name: 'Alain', last_name: 'Ratier', email: 'ratier@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
        {id: 11, first_name: 'Marijane', last_name: 'Moreau-Peterson', email: 'marijane@soluteo.com', phone_number: '123-1345', middle_initials: 'M'},
    ];

    dataSource: MatTableDataSource<Manager>;
    displayedColumns: string[] = ['id', 'first_name', 'email', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private managersService: ManagersService, private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Manager>();
        this.dataSource.sort = this.sort;
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
            // Backend generates id, then returns here in subscribe, re-populate
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
            // Update manager, subscribe, refresh (populate) then snackbar inside.
            if (result) {
                Object.assign(manager, result);
                this.populate();
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
                this.dataSource.data.splice(this.TEST_DATA.indexOf(element), 1);
                this.snackbar.open('Manager deleted.', 'Success!');
            }
        });
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private populate(): void {
        this.dataSource.data = this.TEST_DATA;

        // TODO Uncomment when API works
        // this.querying = true;
        // this.managersService.getManagers().subscribe(managers => {
        //     this.dataSource.data = managers;
        //     this.querying = false;
        //     this.cdRef.detectChanges();
        // });
    }
}
