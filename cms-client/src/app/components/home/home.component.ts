import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/enums/role.enum';

@Component({
    selector: 'cms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    menuOpen = true;
    sideMode: string;
    userRole: string;
    is_admin: boolean;
    Roles = Role;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        event.target.innerWidth <= 800 ? this.sideMode = 'over' : this.sideMode = 'side';
    }

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
        this.userRole = this.auth.getUserRole();
        this.is_admin = this.auth.getCurrentUser().is_admin;
        if (window.innerWidth <= 800) {
            this.sideMode = 'over';
            this.menuOpen = false;
        } else {
            this.sideMode = 'side';
        }
    }
}
