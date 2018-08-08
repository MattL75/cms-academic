import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Province } from '../../../models/enums/province.enum';
import { Role } from '../../../models/enums/role.enum';

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login.component.scss']
})
export class RegisterComponent implements OnInit {

    provinces = Object.keys(Province);

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(5)])]),
        postal_code: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        province_name: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        email_domain: new FormControl('', [Validators.required]),
        role: new FormControl(Role.CLIENT),
        id: new FormControl(null),
        is_admin: new FormControl(false),
    });

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.register(this.registerForm.value);
    }

}
