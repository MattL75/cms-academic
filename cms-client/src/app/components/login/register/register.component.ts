import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(5)])]),
    });

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.register(this.registerForm.controls['username'].value, this.registerForm.controls['password'].value);
    }

    public getQuerying(): boolean {
        // TODO test that this works - seems to always be true after a call?
        return this.auth.getQuerying();
    }

}
