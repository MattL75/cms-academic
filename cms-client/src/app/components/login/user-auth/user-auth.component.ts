import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-user-auth',
    templateUrl: './user-auth.component.html',
    styleUrls: ['./user-auth.component.scss', '../login.component.scss']
})
export class UserAuthComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    }

    public getQuerying(): boolean {
        // TODO test that this works - seems to always be true after a call?
        return this.auth.getQuerying();
    }

}
