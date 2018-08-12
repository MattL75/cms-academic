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
        role: new FormControl(Role.SALES_ASSOCIATE, [Validators.required]),
        is_admin: new FormControl(false, [Validators.required])
    });

    constructor(private authService: AuthService, private salesService: SalesAssociatesService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.salesService.getSpecificSalesAssociate(this.authService.getCurrentUser().id).subscribe(userArray => {
            const user = userArray[0];
            this.entityForm.controls['id'].setValue(user.id);
            this.entityForm.controls['first_name'].setValue(user.first_name);
            this.entityForm.controls['last_name'].setValue(user.last_name);
            this.entityForm.controls['role'].setValue(user.role);
            this.entityForm.controls['role'].disable();
            this.entityForm.controls['is_admin'].setValue(this.phpBoolean(user.is_admin));
            this.entityForm.controls['is_admin'].disable();
        });
    }

    save(): void {
        this.salesService.updateSalesAssociate(this.entityForm.value).subscribe((newUser) => {
            this.authService.setUser(newUser);
            this.snackbar.open('Details saved.', 'Success!');
        }, () => {
            this.snackbar.open('Failed to save details.', 'Dismiss');
        });
    }

    phpBoolean(value: boolean): boolean {
        return !!Number(value);
    }
}
