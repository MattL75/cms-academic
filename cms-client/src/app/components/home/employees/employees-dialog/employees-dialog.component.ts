import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentsService } from '../../../../services/entity/departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsuranceType } from '../../../../models/enums/insurance.enum';
import { Province } from '../../../../models/enums/province.enum';
import { Employee } from '../../../../models/employee.model';
import { Role } from '../../../../models/enums/role.enum';
import { Department } from '../../../../models/department.model';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'cms-employees-dialog',
    templateUrl: './employees-dialog.component.html',
    styleUrls: ['./employees-dialog.component.scss', '../../home.component.scss']
})
export class EmployeesDialogComponent implements OnInit {

    // TODO add filtering for the autocomplete fields

    entityForm = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        insurance_type: new FormControl('', [Validators.required]),
        username: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(Role.EMPLOYEE),
        is_admin: new FormControl(false),
        department_id: new FormControl('', [Validators.required])
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    insuranceTypes = Object.values(InsuranceType);
    provinces = Object.values(Province);

    constructor(public dialogRef: MatDialogRef<EmployeesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {employee: Employee, title: string, action: string, mode: string},
                private depts: DepartmentsService) {
    }

    ngOnInit() {
        this.entityForm.controls['id'].setValue(this.data.employee.id);
        this.entityForm.controls['first_name'].setValue(this.data.employee.first_name);
        this.entityForm.controls['last_name'].setValue(this.data.employee.last_name);
        this.entityForm.controls['province_name'].setValue(this.data.employee.province_name);
        this.entityForm.controls['insurance_type'].setValue(this.data.employee.insurance_type);
        this.entityForm.controls['username'].setValue(this.data.employee.username);
        this.entityForm.controls['password'].setValue(this.data.employee.password);
        this.entityForm.controls['department_id'].setValue(this.data.employee.department_id);

        if (this.data.mode === 'add') {
            this.entityForm.controls['username'].setValidators(Validators.required);
            this.entityForm.controls['password'].setValidators(Validators.required);
        }

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts;
        });

        this.filteredDepartments = this.entityForm.controls['department_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.departmentFilter(value))
            );
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

    // Needed to access variables inside the component
    getDepartmentLinkFn() {
        return (val) => this.displayDepartmentFn(val);
    }

    // Performs the actual operation of mapping id to name
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

}
