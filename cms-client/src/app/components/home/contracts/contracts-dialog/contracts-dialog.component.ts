import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentsService } from '../../../../services/entity/departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract } from '../../../../models/contract.model';
import { ClientsService } from '../../../../services/entity/clients.service';
import { Client } from '../../../../models/client.model';
import { ContractType } from '../../../../models/enums/contract-type.enum';
import { AuthService } from '../../../../services/auth.service';
import { Department } from '../../../../models/department.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'cms-contracts-dialog',
    templateUrl: './contracts-dialog.component.html',
    styleUrls: ['./contracts-dialog.component.scss', '../../home.component.scss']
})
export class ContractsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        acv: new FormControl('', [Validators.required]),
        initial_amount: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        recorded_by: new FormControl(''),
        department_id: new FormControl('', [Validators.required]),
        client_id: new FormControl('', [Validators.required]),
        business_line: new FormControl('', [Validators.required]),
        contract_type: new FormControl('', [Validators.required]),
        active: new FormControl('', [Validators.required])
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    clients: Client[];
    filteredClients: Observable<Client[]>;
    contractTypes = Object.values(ContractType);

    constructor(public dialogRef: MatDialogRef<ContractsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Contract, title: string, action: string},
                private depts: DepartmentsService, private clientService: ClientsService, private authService: AuthService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['acv'].setValue(this.data.entity.acv);
        this.entityForm.controls['initial_amount'].setValue(this.data.entity.initial_amount);
        this.entityForm.controls['start_date'].setValue(this.data.entity.start_date);
        this.entityForm.controls['department_id'].setValue(this.data.entity.department_id);
        this.entityForm.controls['client_id'].setValue(this.data.entity.client_id);
        this.entityForm.controls['business_line'].setValue(this.data.entity.business_line);
        this.entityForm.controls['contract_type'].setValue(this.data.entity.contract_type);
        this.entityForm.controls['recorded_by'].setValue(this.authService.getCurrentUser().id);

        // TODO check if php fucks up this boolean
        this.entityForm.controls['active'].setValue(this.data.entity.active);

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts;
        });
        this.filteredDepartments = this.entityForm.controls['department_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.departmentFilter(value))
            );

        this.clientService.getClients().subscribe(clientArray => {
            this.clients = clientArray;
        });
        this.filteredClients = this.entityForm.controls['client_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.clientFilter(value))
            );
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

    getDepartmentLinkFn() {
        return (val) => this.displayDepartmentFn(val);
    }

    displayDepartmentFn(department: number): string | undefined {
        if (!this.departments) {
            return undefined;
        }
        const result = this.departments.find(x => x.id === department);
        return result ? result.name : undefined;
    }

    private departmentFilter(value: string): Department[] {
        if (typeof value !== 'string' || !this.departments) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.departments.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    getClientLinkFn() {
        return (val) => this.displayClientFn(val);
    }

    displayClientFn(client: number): string | undefined {
        if (!this.clients) {
            return undefined;
        }
        const result = this.clients.find(x => x.id === client);
        return result ? result.name : undefined;
    }

    private clientFilter(value: string): Client[] {
        if (typeof value !== 'string' || !this.clients) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}
