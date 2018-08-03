import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../models/enums/role.enum';
import { InsuranceType } from '../../../models/enums/insurance.enum';
import { Province } from '../../../models/enums/province.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss', '../../home/home.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

    entityForm = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        insurance: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        is_admin: new FormControl('', [Validators.required]),
        department_id: new FormControl('', [Validators.required])
    });
    departments: number[];
    insuranceTypes = Object.keys(InsuranceType);
    provinces = Object.keys(Province);
    user;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.entityForm.controls['department_id'] = this.user.department_id;
        this.entityForm.controls['department_id'].disable();
        this.entityForm.controls['role'] = this.user.role;
        this.entityForm.controls['role'].disable();
        this.entityForm.controls['is_admin'] = this.user.is_admin;
        this.entityForm.controls['is_admin'].disable();
        this.entityForm.controls['first_name'] = this.user.first_name;
        this.entityForm.controls['last_name'] = this.user.last_name;
        this.entityForm.controls['province'] = this.user.province;
        this.entityForm.controls['insurance'] = this.user.insurance;
        this.entityForm.controls['username'] = this.user.username;
        this.entityForm.controls['username'].disable();
        this.entityForm.controls['password'] = this.user.password;
    }

    save(): void {
        // TODO some sort of save 'me'
    }

}
