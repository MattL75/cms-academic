import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/enums/role.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'cms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    menuOpen = true;
    sideMode: string;
    roles: Role;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        event.target.innerWidth <= 800 ? this.sideMode = 'over' : this.sideMode = 'side';
    }

    constructor(protected auth: AuthService) {
    }

    ngOnInit() {
        if (window.innerWidth <= 800) {
            this.sideMode = 'over';
            this.menuOpen = false;
        } else {
            this.sideMode = 'side';
        }
    }

    checkProfileAccess(): boolean {
        return true;
        // TODO Uncomment when api works, also put this in the html
        // return this.auth.getUserRole() === Role.EMPLOYEE || this.auth.getUserRole() === Role.MANAGER;
    }
}
