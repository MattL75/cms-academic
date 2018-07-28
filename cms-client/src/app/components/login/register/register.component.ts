import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login.component.scss']
})
export class RegisterComponent implements OnInit {
    querying = false;

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.compose([Validators.required, Validators.minLength(5)])]),
    });

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        // To be put inside an async call
        this.querying = true;
        this.auth.register();

        setTimeout(() => {
            if (this.auth.isAuthenticated()) {
                // Probably do this in the service
                this.router.navigate(['']);
            }
            this.querying = false;
        }, 5000);
    }

}
