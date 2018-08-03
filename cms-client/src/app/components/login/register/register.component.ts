import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login.component.scss']
})
export class RegisterComponent implements OnInit {

    // TODO test the 'querying' field works, seems to always be true after call?

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(5)])]),
    });

    constructor(protected auth: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.auth.register(this.registerForm.controls['username'].value, this.registerForm.controls['password'].value);
    }

}
