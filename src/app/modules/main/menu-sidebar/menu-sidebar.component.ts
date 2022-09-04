import {Component, HostBinding, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public user;
    public menu = MENU;

    constructor(
        public authService: AuthService,
    ) {}

    ngOnInit() {
        this.authService.getUser().subscribe((user) => {
            this.user = user;
        })
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Machines',
        iconClasses: 'fas fa-hdd',
        path: ['/machines']
    },
];
