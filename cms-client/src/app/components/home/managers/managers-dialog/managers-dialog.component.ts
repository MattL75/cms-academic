import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentsService } from '../../../../services/entity/departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from '../../../../models/manager.model';
import { InsuranceType } from '../../../../models/enums/insurance.enum';
import { Province } from '../../../../models/enums/province.enum';
import { Role } from '../../../../models/enums/role.enum';
import { Department } from '../../../../models/department.model';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'cms-managers-dialog',
    templateUrl: './managers-dialog.component.html',
    styleUrls: ['./managers-dialog.component.scss', '../../home.component.scss']
})
export class ManagersDialogComponent implements OnInit {

    managersForm = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.compose([Validators.email, Validators.required])]),
        phone_number: new FormControl('', [Validators.required]),
        middle_initial: new FormControl(''),
        province_name: new FormControl('', [Validators.required]),
        insurance_type: new FormControl('', [Validators.required]),
        department_id: new FormControl('', [Validators.required]),
        username: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(Role.MANAGER),
        is_admin: new FormControl(false),
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    insuranceTypes = Object.values(InsuranceType);
    provinces = Object.values(Province);

    constructor(public dialogRef: MatDialogRef<ManagersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {manager: Manager, title: string, action: string, mode: string},
                private depts: DepartmentsService) {
    }

    ngOnInit() {
        this.managersForm.controls['id'].setValue(this.data.manager.id);
        this.managersForm.controls['first_name'].setValue(this.data.manager.first_name);
        this.managersForm.controls['last_name'].setValue(this.data.manager.last_name);
        this.managersForm.controls['email'].setValue(this.data.manager.email);
        this.managersForm.controls['phone_number'].setValue(this.data.manager.phone_number);
        this.managersForm.controls['middle_initial'].setValue(this.data.manager.middle_initial);
        this.managersForm.controls['province_name'].setValue(this.data.manager.province_name);
        this.managersForm.controls['insurance_type'].setValue(this.data.manager.insurance_type);
        this.managersForm.controls['department_id'].setValue(this.data.manager.department_id);
        this.managersForm.controls['username'].setValue(this.data.manager.username);
        this.managersForm.controls['password'].setValue(this.data.manager.password);

        if (this.data.mode === 'add') {
            this.managersForm.controls['username'].setValidators(Validators.required);
            this.managersForm.controls['password'].setValidators(Validators.required);
        }

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts;
            console.log(this.managersForm.controls['department_id'].value);
        });

        this.filteredDepartments = this.managersForm.controls['department_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.departmentFilter(value))
            );
    }

    public close(): void {
        console.log(this.managersForm.controls['department_id'].value);
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        console.log(this.managersForm.controls['department_id'].value);
        this.dialogRef.close(this.managersForm.value);
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

    displayDeptInputFn(department: number, input: HTMLInputElement): string {
        if (!this.departments) {
            return this.managersForm.controls['department_id'].value;
        }
        const result = this.departments.find(x => x.id === department);
        return result ? result.name : input.value;
    }

    private departmentFilter(value: string): Department[] {
        if (typeof value !== 'string' || !this.departments) {
            return null;
        }
        const filterValue = value.toLowerCase();
        return this.departments.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}
