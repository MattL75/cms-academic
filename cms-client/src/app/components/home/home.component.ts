import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'cms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    menuOpen = true;
    sideMode: string;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        event.target.innerWidth <= 800 ? this.sideMode = 'over' : this.sideMode = 'side';
    }

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        if (window.innerWidth <= 800) {
            this.sideMode = 'over';
            this.menuOpen = false;
        } else {
            this.sideMode = 'side';
        }
    }

    logout(): void {
        this.auth.logout();
    }
}
