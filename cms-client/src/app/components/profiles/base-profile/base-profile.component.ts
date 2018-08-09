import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../models/enums/role.enum';

@Component({
    selector: 'cms-base-profile',
    templateUrl: './base-profile.component.html',
    styleUrls: ['./base-profile.component.scss', '../../home/home.component.scss']
})
export class BaseProfileComponent implements OnInit {

    role: string;
    Roles = Role;

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.role = this.auth.getUserRole();
    }

}
