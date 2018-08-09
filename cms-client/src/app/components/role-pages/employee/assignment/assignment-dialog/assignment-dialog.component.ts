import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { Assignment } from '../../../../../models/assignment.model';
import { EmployeesService } from '../../../../../services/entity/employees.service';
import { ContractsService } from '../../../../../services/entity/contracts.service';
import { Observable } from 'rxjs';
import { Employee } from '../../../../../models/employee.model';
import { Contract } from '../../../../../models/contract.model';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'cms-assignment-dialog',
    templateUrl: './assignment-dialog.component.html',
    styleUrls: ['./assignment-dialog.component.scss', '../../../../home/home.component.scss']
})
export class AssignmentDialogComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null),
        employee_id: new FormControl('', [Validators.required]),
        contract_id: new FormControl('', [Validators.required]),
        is_active: new FormControl('', [Validators.required])
    });

    user;

    contracts: Contract[];
    filteredContracts: Observable<Contract[]>;

    employees: Employee[];
    filteredEmployees: Observable<Employee[]>;

    constructor(public dialogRef: MatDialogRef<AssignmentDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {entity: Assignment, title: string, action: string}, private auth: AuthService,
                private employeeService: EmployeesService, private contractService: ContractsService) {
    }

    ngOnInit() {
        this.user = this.auth.getCurrentUser();
        this.entityForm.controls['id'].setValue(this.data.entity.id);
        this.entityForm.controls['employee_id'].setValue(this.data.entity.employee_id);
        this.entityForm.controls['contract_id'].setValue(this.data.entity.contract_id);

        // TODO check if PHP fucks up this boolean
        this.entityForm.controls['is_active'].setValue(this.data.entity.is_active);

        this.contractService.getManagerContracts(this.user.id).subscribe(contArray => {
            this.contracts = contArray;
        });

        this.employeeService.getEmployees().subscribe(emps => {
            this.employees = emps;
        });

        this.filteredContracts = this.entityForm.controls['contract_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.contractFilter(value))
            );

        this.filteredEmployees = this.entityForm.controls['employee_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.employeeFilter(value))
            );
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

    getContractLinkFn() {
        return (val) => this.displayContractFn(val);
    }

    displayContractFn(manager: number): string | undefined {
        if (!this.contracts) {
            return undefined;
        }
        const result = this.contracts.find(x => x.id === manager);
        return result ? result.name : undefined;
    }

    private contractFilter(value: string): Contract[] {
        if (typeof value !== 'string' || !this.contracts) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.contracts.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    getEmployeeLinkFn() {
        return (val) => this.displayEmployeeFn(val);
    }

    displayEmployeeFn(employee: number): string | undefined {
        if (!this.employees) {
            return undefined;
        }
        const result = this.employees.find(x => x.id === employee);
        return result ? (result.first_name + ' ' + result.last_name) : undefined;
    }

    private employeeFilter(value: string): Employee[] {
        if (typeof value !== 'string' || !this.employees) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.employees.filter(option => (option.first_name.concat('.', option.last_name)).toLowerCase().includes(filterValue));
    }

    displayEmpInputFn(employee: number, input: HTMLInputElement): string {
        if (!this.employees) {
            return this.entityForm.controls['employee_id'].value;
        }
        const result = this.employees.find(x => x.id === employee);
        return result ? (result.first_name + ' ' + result.last_name) : input.value;
    }

    displayContInputFn(contract: number, input: HTMLInputElement): string {
        if (!this.contracts) {
            return this.entityForm.controls['contract_id'].value;
        }
        const result = this.contracts.find(x => x.id === contract);
        return result ? result.name : input.value;
    }

}
