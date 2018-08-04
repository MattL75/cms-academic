import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'cms-base-profile',
    templateUrl: './base-profile.component.html',
    styleUrls: ['./base-profile.component.scss']
})
export class BaseProfileComponent implements OnInit {

    role: string;

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.role = this.auth.getUserRole();
    }

}
