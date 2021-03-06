import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';
import { expandX } from '../../../animations/expand';
import { Contract } from '../../../models/contract.model';
import { ContractsService } from '../../../services/entity/contracts.service';
import { ContractsDialogComponent } from './contracts-dialog/contracts-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';
import { ContractType } from '../../../models/enums/contract-type.enum';

@Component({
    selector: 'cms-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss', '../home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ContractsComponent implements OnInit {

    dataSource: MatTableDataSource<Contract>;
    displayedColumns: string[] = ['id', 'name', 'acv', 'start_date', 'initial_amount', 'client_satisfaction', 'recorded_by', 'department_id', 'client_id', 'manager_id', 'business_line', 'contract_type', 'active'];
    querying = false;
    openFilter = false;
    activeCategory = 'all';
    userRole = '';
    is_admin = false;
    Roles = Role;
    types = Object.keys(ContractType);

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private contractService: ContractsService, private auth: AuthService) {
    }

    ngOnInit() {
        this.userRole = this.auth.getUserRole();
        this.is_admin = this.phpBoolean(this.auth.getCurrentUser().is_admin);

        if (this.userRole === Role.SALES_ASSOCIATE || this.is_admin) {
            this.displayedColumns.push('actions');
        }

        this.dataSource = new MatTableDataSource<Contract>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public add(): void {
        if (this.userRole !== this.Roles.SALES_ASSOCIATE && !this.is_admin) {
            this.snackbar.open('Access denied.', 'Dismiss');
            return;
        }
        const dialogRef = this.dialog.open(ContractsDialogComponent, {
            width: '450px',
            data: {
                entity: {},
                title: 'Add a Contract',
                action: 'Add'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.contractService.addContract(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Contract added.', 'Success!');
                }, () => {
                    this.populate();
                    this.snackbar.open('Contract added with warnings.', 'Dismiss');
                });
            }
        });
    }

    public edit(contract: Contract): void {
        if (this.userRole !== this.Roles.SALES_ASSOCIATE && !this.is_admin) {
            this.snackbar.open('Access denied.', 'Dismiss');
            return;
        }
        const dialogRef = this.dialog.open(ContractsDialogComponent, {
            width: '450px',
            data: {
                entity: Object.assign({}, contract),
                title: 'Edit a Contract',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.contractService.updateContract(result).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Contract modified.', 'Success!');
                }, () => {
                    this.populate();
                    this.snackbar.open('Contract modified with warnings.', 'Dismiss');
                });
            }
        });
    }

    public delete(element: Contract): void {
        if (this.userRole !== this.Roles.SALES_ASSOCIATE && !this.is_admin) {
            this.snackbar.open('Access denied.', 'Dismiss');
            return;
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Warning',
                icon: 'warning',
                action: 'Delete',
                content: 'Are you sure you want to delete this contract?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                this.contractService.deleteContract(element.id).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Contract deleted.', 'Success!');
                }, () => {
                    this.populate();
                    this.snackbar.open('Contract deleted with warnings..', 'Dismiss');
                });
            }
        });
    }

    public applyFilter(filterValue): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    selectCategory(category: string): void {
        this.querying = true;
        this.contractService.getContractsByCategory(category).subscribe(contracts => {
            this.dataSource.data = contracts;
            this.activeCategory = category;
            this.querying = false;
        }, () => {
            this.snackbar.open('Category change failed.', 'Dismiss');
            this.querying = false;
        });
    }

    populate(): void {
        this.querying = true;
        this.contractService.getContracts().subscribe(contracts => {
            this.dataSource.data = contracts;
            this.activeCategory = 'all';
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
