import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsuranceType } from '../../../models/enums/insurance.enum';
import { Province } from '../../../models/enums/province.enum';
import { AuthService } from '../../../services/auth.service';
import { Department } from '../../../models/department.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DepartmentsService } from '../../../services/entity/departments.service';
import { Role } from '../../../models/enums/role.enum';
import { ManagersService } from '../../../services/entity/managers.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Manager } from '../../../models/manager.model';

@Component({
    selector: 'cms-manager-profile',
    templateUrl: './manager-profile.component.html',
    styleUrls: ['./manager-profile.component.scss', '../base-profile/base-profile.component.scss']
})
export class ManagerProfileComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.compose([Validators.email, Validators.required])]),
        phone_number: new FormControl('', [Validators.required]),
        middle_initial: new FormControl(''),
        province: new FormControl('', [Validators.required]),
        insurance: new FormControl('', [Validators.required]),
        department_id: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.MANAGER, [Validators.required]),
        is_admin: new FormControl(false, [Validators.required]),
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    insuranceTypes = Object.keys(InsuranceType);
    provinces = Object.keys(Province);
    user: Manager;

    constructor(private authService: AuthService, private depts: DepartmentsService, private managerService: ManagersService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.entityForm.controls['id'].setValue(this.user.id);
        this.entityForm.controls['department_id'].setValue(this.user.department_id);
        this.entityForm.controls['role'].setValue(this.user.role);
        this.entityForm.controls['role'].disable();
        this.entityForm.controls['is_admin'].setValue(this.user.is_admin);
        this.entityForm.controls['is_admin'].disable();
        this.entityForm.controls['first_name'].setValue(this.user.first_name);
        this.entityForm.controls['last_name'].setValue(this.user.last_name);
        this.entityForm.controls['province'].setValue(this.user.province);
        this.entityForm.controls['insurance'].setValue(this.user.insurance);
        this.entityForm.controls['username'].setValue(this.user.username);
        this.entityForm.controls['password'].setValue(this.user.password);
        this.entityForm.controls['email'].setValue(this.user.email);
        this.entityForm.controls['phone_number'].setValue(this.user.phone_number);
        this.entityForm.controls['middle_initials'].setValue(this.user.middle_initial);

        this.depts.getDepartments().subscribe(depts => {
            this.departments = depts;
        });

        this.filteredDepartments = this.entityForm.controls['department_id'].valueChanges
            .pipe(
                startWith(''),
                map(value => this.departmentFilter(value))
            );
    }

    save(): void {
        this.managerService.updateManager(this.entityForm.value).subscribe((newUser) => {
            //  TODO Refresh session? Login then logout? Check if works.
            this.authService.setUser(newUser);
            this.snackbar.open('Details saved.', 'Success!');
        }, () => {
            this.snackbar.open('Failed to save details.', 'Dismiss');
        });
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
