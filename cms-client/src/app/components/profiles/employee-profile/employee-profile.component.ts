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
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../../services/entity/employees.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ContractType } from '../../../models/enums/contract-type.enum';

@Component({
    selector: 'cms-employee-profile',
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss', '../base-profile/base-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        insurance_type: new FormControl(''),
        contract_type_preference: new FormControl(''),
        role: new FormControl(Role.EMPLOYEE, [Validators.required]),
        is_admin: new FormControl(false, [Validators.required]),
        department_id: new FormControl('', [Validators.required])
    });
    departments: Department[];
    filteredDepartments: Observable<Department[]>;
    insuranceTypes = Object.values(InsuranceType);
    provinces = Object.values(Province);
    types = Object.values(ContractType);

    constructor(private authService: AuthService, private depts: DepartmentsService, private employeesService: EmployeesService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.employeesService.getSpecificEmployee(this.authService.getCurrentUser().id).subscribe(userArray => {
            const user = userArray[0];
            this.entityForm.controls['id'].setValue(user.id);
            this.entityForm.controls['department_id'].setValue(user.department_id);
            this.entityForm.controls['role'].setValue(user.role);
            this.entityForm.controls['role'].disable();
            this.entityForm.controls['is_admin'].setValue(this.phpBoolean(user.is_admin));
            this.entityForm.controls['is_admin'].disable();
            this.entityForm.controls['first_name'].setValue(user.first_name);
            this.entityForm.controls['last_name'].setValue(user.last_name);
            this.entityForm.controls['contract_type_preference'].setValue(user.contract_type_preference);
            this.entityForm.controls['province_name'].setValue(user.province_name);
            this.entityForm.controls['insurance_type'].setValue(user.insurance_type);
        });

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
        this.employeesService.updateEmployee(this.entityForm.value).subscribe(() => {
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

    displayDeptInputFn(department: number, input: HTMLInputElement): string {
        if (!this.departments) {
            return this.entityForm.controls['department_id'].value;
        }
        const result = this.departments.find(x => x.id === department);
        return result ? result.name : input.value;
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
