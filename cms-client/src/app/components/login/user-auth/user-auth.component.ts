import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-user-auth',
    templateUrl: './user-auth.component.html',
    styleUrls: ['./user-auth.component.scss', '../login.component.scss']
})
export class UserAuthComponent implements OnInit {

    // TODO test that the 'querying' variable works in authService, seems to always be true.

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(protected auth: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        // TODO need to realize when a login attempt fails.
        this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    }

}
