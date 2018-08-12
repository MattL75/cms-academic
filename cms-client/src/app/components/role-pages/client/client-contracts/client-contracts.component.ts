import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { Contract } from '../../../../models/contract.model';
import { SnackbarService } from '../../../../services/snackbar.service';
import { expandX } from '../../../../animations/expand';
import { ContractsService } from '../../../../services/entity/contracts.service';
import { ClientContractsDialogComponent } from './client-contracts-dialog/client-contracts-dialog.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'cms-client-contracts',
    templateUrl: './client-contracts.component.html',
    styleUrls: ['./client-contracts.component.scss', '../../../home/home.component.scss'],
    animations: [
        expandX({time: 200})
    ]
})
export class ClientContractsComponent implements OnInit {

    dataSource: MatTableDataSource<Contract>;
    displayedColumns: string[] = ['id', 'business_line', 'contract_type', 'start_date', 'acv', 'initial_amount', 'client_satisfaction', 'actions'];
    querying = false;
    openFilter = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private snackbar: SnackbarService, public dialog: MatDialog, private contractService: ContractsService, private auth: AuthService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<Contract>();
        this.dataSource.sort = this.sort;
        this.populate();
    }

    public rate(contract: Contract): void {
        const localContract = contract;
        const dialogRef = this.dialog.open(ClientContractsDialogComponent, {
            width: '350px',
            data: {
                rating: localContract.client_satisfaction,
                title: 'Rate a Contract',
                action: 'Save'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.querying = true;
                localContract.client_satisfaction = result;
                this.contractService.updateContract(localContract).subscribe(() => {
                    this.populate();
                    this.snackbar.open('Contract rated.', 'Success!');
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
        this.contractService.getClientContracts(this.auth.getCurrentUser().id).subscribe(contracts => {
            this.dataSource.data = contracts;
            this.querying = false;
        }, () => {
            this.snackbar.open('Population query failed.', 'Dismiss');
            this.querying = false;
        });
    }
}
