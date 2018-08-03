import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepartmentsService } from '../../../../services/entity/departments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from '../../../../models/manager.model';
import { InsuranceType } from '../../../../models/enums/insurance.enum';
import { Province } from '../../../../models/enums/province.enum';
import { Role } from '../../../../models/enums/role.enum';

@Component({
    selector: 'cms-managers-dialog',
    templateUrl: './managers-dialog.component.html',
    styleUrls: ['./managers-dialog.component.scss', '../../home.component.scss']
})
export class ManagersDialogComponent implements OnInit {

    // TODO add filtering for the autocomplete fields

    managersForm = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.compose([Validators.email, Validators.required])]),
        phone_number: new FormControl('', [Validators.required]),
        middle_initials: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        insurance: new FormControl('', [Validators.required]),
        department_id: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.MANAGER),
        is_admin: new FormControl(false),
    });
    departments: number[];
    insuranceTypes = Object.keys(InsuranceType);
    provinces = Object.keys(Province);

    constructor(public dialogRef: MatDialogRef<ManagersDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {manager: Manager, title: string, action: string},
                private depts: DepartmentsService) {
    }

    ngOnInit() {
        this.managersForm.controls['first_name'].setValue(this.data.manager.first_name);
        this.managersForm.controls['last_name'].setValue(this.data.manager.last_name);
        this.managersForm.controls['email'].setValue(this.data.manager.email);
        this.managersForm.controls['phone_number'].setValue(this.data.manager.phone_number);
        this.managersForm.controls['middle_initials'].setValue(this.data.manager.middle_initials);
        this.managersForm.controls['province'].setValue(this.data.manager.province);
        this.managersForm.controls['insurance'].setValue(this.data.manager.insurance);
        this.managersForm.controls['department_id'].setValue(this.data.manager.department_id);
        this.managersForm.controls['username'].setValue(this.data.manager.username);
        this.managersForm.controls['password'].setValue(this.data.manager.password);

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts.map(dept => dept.id);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }

    public closeSubmit(): void {
        this.dialogRef.close(this.managersForm.value);
    }

}
