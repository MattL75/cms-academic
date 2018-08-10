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
import { Manager } from '../../../../models/manager.model';
import { ManagersService } from '../../../../services/entity/managers.service';

@Component({
    selector: 'cms-contracts-dialog',
    templateUrl: './contracts-dialog.component.html',
    styleUrls: ['./contracts-dialog.component.scss', '../../home.component.scss']
})
export class ContractsDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        acv: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        initial_amount: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        recorded_by: new FormControl(''),
        department_id: new FormControl('', [Validators.required]),
        client_id: new FormControl('', [Validators.required]),
        business_line: new FormControl('', [Validators.required]),
        contract_type: new FormControl('', [Validators.required]),
        manager_id: new FormControl('', [Validators.required]),
        active: new FormControl('', [Validators.required])
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    clients: Client[];
    filteredClients: Observable<Client[]>;
    managers: Manager[];
    filteredManagers: Observable<Manager[]>;
    contractTypes = Object.values(ContractType);

    constructor(public dialogRef: MatDialogRef<ContractsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Contract, title: string, action: string},
                private depts: DepartmentsService, private clientService: ClientsService, private managerService: ManagersService, private authService: AuthService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['acv'].setValue(this.data.entity.acv);
        this.entityForm.controls['name'].setValue(this.data.entity.name);
        this.entityForm.controls['initial_amount'].setValue(this.data.entity.initial_amount);
        this.entityForm.controls['start_date'].setValue(this.data.entity.start_date);
        this.entityForm.controls['department_id'].setValue(this.data.entity.department_id);
        this.entityForm.controls['client_id'].setValue(this.data.entity.client_id);
        this.entityForm.controls['business_line'].setValue(this.data.entity.business_line);
        this.entityForm.controls['contract_type'].setValue(this.data.entity.contract_type);
        this.entityForm.controls['manager_id'].setValue(this.data.entity.manager_id);
        this.entityForm.controls['recorded_by'].setValue(this.authService.getCurrentUser().id);
        this.entityForm.controls['active'].setValue(this.phpBooleanInner(this.data.entity.active));

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

        this.managerService.getManagers().subscribe(managerArray => {
            this.managers = managerArray;
        });
        this.filteredManagers = this.entityForm.controls['manager_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.managerFilter(value))
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

    getManagerLinkFn() {
        return (val) => this.displayManagerFn(val);
    }

    displayManagerFn(manager: number): string | undefined {
        if (!this.managers) {
            return undefined;
        }
        const result = this.managers.find(x => x.id === manager);
        return result ? result.first_name + ' ' + result.last_name : undefined;
    }

    private managerFilter(value: string): Manager[] {
        if (typeof value !== 'string' || !this.managers) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.managers.filter(option => (option.first_name.concat('.', option.last_name)).toLowerCase().includes(filterValue));
    }

    displayDeptInputFn(department: number, input: HTMLInputElement): string {
        if (!this.departments) {
            return this.entityForm.controls['department_id'].value;
        }
        const result = this.departments.find(x => x.id === department);
        return result ? result.name : input.value;
    }

    displayClientInputFn(client: number, input: HTMLInputElement): string {
        if (!this.clients) {
            return this.entityForm.controls['client_id'].value;
        }
        const result = this.clients.find(x => x.id === client);
        return result ? result.name : input.value;
    }

    displayManInputFn(manager: number, input: HTMLInputElement): string {
        if (!this.managers) {
            return this.entityForm.controls['manager_id'].value;
        }
        const result = this.managers.find(x => x.id === manager);
        return result ? (result.first_name + ' ' + result.last_name) : input.value;
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }

    phpBooleanInner(value: boolean): boolean {
        if (value === null || value === undefined) {
            return null;
        }
        return !!Number(value);
    }

}
