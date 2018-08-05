import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';
import { SnackbarService } from '../../../services/snackbar.service';
import { SalesAssociate } from '../../../models/sales-associate.model';
import { SalesAssociatesService } from '../../../services/entity/sales-associates.service';

@Component({
    selector: 'cms-sales-profile',
    templateUrl: './sales-profile.component.html',
    styleUrls: ['./sales-profile.component.scss', '../base-profile/base-profile.component.scss']
})
export class SalesProfileComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.SALES_ASSOCIATE, [Validators.required]),
        is_admin: new FormControl(false, [Validators.required])
    });
    user: SalesAssociate;

    constructor(private authService: AuthService, private salesService: SalesAssociatesService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.entityForm.controls['id'].setValue(this.user.id);
        this.entityForm.controls['first_name'].setValue(this.user.first_name);
        this.entityForm.controls['last_name'].setValue(this.user.last_name);
        this.entityForm.controls['username'].setValue(this.user.username);
        this.entityForm.controls['password'].setValue(this.user.password);
        this.entityForm.controls['role'].setValue(this.user.role);
        this.entityForm.controls['role'].disable();
        this.entityForm.controls['is_admin'].setValue(this.user.is_admin);
        this.entityForm.controls['is_admin'].disable();
    }

    save(): void {
        this.salesService.updateSalesAssociate(this.entityForm.value).subscribe((newUser) => {
            //  TODO Refresh session? Login then logout? Check if works.
            this.authService.setUser(newUser);
            this.snackbar.open('Details saved.', 'Success!');
        }, () => {
            this.snackbar.open('Failed to save details.', 'Dismiss');
        });
    }
}
