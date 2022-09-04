import {Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUser().subscribe((user) => {
            this.user = user;
        })
    }

    logout() {
        this.authService.logout();
    }
}
