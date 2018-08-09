import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Manager } from '../../../../../models/manager.model';
import { Employee } from '../../../../../models/employee.model';
import { map, startWith } from 'rxjs/operators';
import { EmployeesService } from '../../../../../services/entity/employees.service';
import { ManagersService } from '../../../../../services/entity/managers.service';

@Component({
    selector: 'cms-supervised-dialog',
    templateUrl: './supervised-dialog.component.html',
    styleUrls: ['./supervised-dialog.component.scss', '../../../../home/home.component.scss']
})
export class SupervisedDialogComponent implements OnInit {

    entityForm = new FormGroup({
        manager_id: new FormControl('', [Validators.required]),
        employee_id: new FormControl('', [Validators.required]),
    });

    managers: Manager[];
    filteredManagers: Observable<Manager[]>;

    employees: Employee[];
    filteredEmployees: Observable<Employee[]>;

    constructor(public dialogRef: MatDialogRef<SupervisedDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {id: number, is_admin: boolean, title: string, action: string}, private managerService: ManagersService, private employeeService: EmployeesService) {
    }

    ngOnInit() {
        if (!this.data.is_admin) {
            this.entityForm.controls['manager_id'].setValue(this.data.id);
        }

        this.managerService.getManagers().subscribe(mans => {
            this.managers = mans;
        });

        this.employeeService.getEmployees().subscribe(emps => {
            this.employees = emps;
        });

        this.filteredManagers = this.entityForm.controls['manager_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.managerFilter(value))
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
        this.dialogRef.close({man_id: this.entityForm.controls['manager_id'].value, emp_id: this.entityForm.controls['employee_id'].value});
    }

    getManagerLinkFn() {
        return (val) => this.displayManagerFn(val);
    }

    displayManagerFn(manager: number): string | undefined {
        if (!this.managers) {
            return undefined;
        }
        const result = this.managers.find(x => x.id === manager);
        return result ? (result.first_name + ' ' + result.last_name) : undefined;
    }

    private managerFilter(value: string): Manager[] {
        if (typeof value !== 'string' || !this.managers) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.managers.filter(option => (option.first_name).toLowerCase().includes(filterValue));
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
        return this.employees.filter(option => (option.first_name).toLowerCase().includes(filterValue));
    }

}
