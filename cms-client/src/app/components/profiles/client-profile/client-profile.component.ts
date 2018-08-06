import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../../models/enums/province.enum';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';
import { SnackbarService } from '../../../services/snackbar.service';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/entity/clients.service';

@Component({
    selector: 'cms-client-profile',
    templateUrl: './client-profile.component.html',
    styleUrls: ['./client-profile.component.scss', '../base-profile/base-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

    entityForm = new FormGroup({
        id: new FormControl(null, [Validators.required]),
        email_domain: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        postal_code: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role: new FormControl(Role.CLIENT, [Validators.required]),
        is_admin: new FormControl(false, [Validators.required])
    });
    provinces = Object.keys(Province);
    user: Client;

    constructor(private authService: AuthService, private clientsService: ClientsService, private snackbar: SnackbarService) {
    }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
        this.entityForm.controls['id'].setValue(this.user.id);
        this.entityForm.controls['email_domain'].setValue(this.user.email_domain);
        this.entityForm.controls['name'].setValue(this.user.name);
        this.entityForm.controls['province'].setValue(this.user.province);
        this.entityForm.controls['address'].setValue(this.user.address);
        this.entityForm.controls['postal_code'].setValue(this.user.postal_code);
        this.entityForm.controls['username'].setValue(this.user.username);
        this.entityForm.controls['password'].setValue(this.user.password);
        this.entityForm.controls['role'].setValue(this.user.role);
        this.entityForm.controls['role'].disable();
        this.entityForm.controls['is_admin'].setValue(this.user.is_admin);
        this.entityForm.controls['is_admin'].disable();
    }

    save(): void {
        this.clientsService.updateClient(this.entityForm.value).subscribe((newUser) => {
            //  TODO Refresh session? Login then logout? Check if works.
            this.authService.setUser(newUser);
            this.snackbar.open('Details saved.', 'Success!');
        }, () => {
            this.snackbar.open('Failed to save details.', 'Dismiss');
        });
    }
}
