import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-user-auth',
    templateUrl: './user-auth.component.html',
    styleUrls: ['./user-auth.component.scss', '../login.component.scss']
})
export class UserAuthComponent implements OnInit {

    querying = false;

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        // To be put inside an async call
        this.querying = true;
        this.auth.login();

        setTimeout(() => {
            if (this.auth.isAuthenticated()) {
                this.router.navigate(['']);
            }
            this.querying = false;
        }, 2000);
    }

}
