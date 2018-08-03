import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentsService } from '../../../../services/entity/departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsuranceType } from '../../../../models/enums/insurance.enum';
import { Province } from '../../../../models/enums/province.enum';
import { Employee } from '../../../../models/employee.model';
import { Role } from '../../../../models/enums/role.enum';

@Component({
    selector: 'cms-employees-dialog',
    templateUrl: './employees-dialog.component.html',
    styleUrls: ['./employees-dialog.component.scss', '../../home.component.scss']
})
export class EmployeesDialogComponent implements OnInit {

    // TODO add filtering for the autocomplete fields

    entityForm = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        insurance: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.EMPLOYEE),
        is_admin: new FormControl(false),
        department_id: new FormControl('', [Validators.required])
    });
    departments: number[];
    insuranceTypes = Object.keys(InsuranceType);
    provinces = Object.keys(Province);

    constructor(public dialogRef: MatDialogRef<EmployeesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {employee: Employee, title: string, action: string},
                private depts: DepartmentsService) {
    }

    ngOnInit() {
        this.entityForm.controls['first_name'].setValue(this.data.employee.first_name);
        this.entityForm.controls['last_name'].setValue(this.data.employee.last_name);
        this.entityForm.controls['province'].setValue(this.data.employee.province);
        this.entityForm.controls['insurance'].setValue(this.data.employee.insurance);
        this.entityForm.controls['username'].setValue(this.data.employee.username);
        this.entityForm.controls['password'].setValue(this.data.employee.password);
        this.entityForm.controls['department_id'].setValue(this.data.employee.department_id);

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts.map(dept => dept.id);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.entityForm.value);
    }

}
