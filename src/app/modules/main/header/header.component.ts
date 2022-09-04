import {Component, HostBinding, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { UiService } from '@services/ui.service';

const BASE_CLASSES = 'main-header navbar navbar-expand';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public searchForm: UntypedFormGroup;

    constructor(private authService: AuthService, private uiService: UiService) {}

    ngOnInit() {
        this.searchForm = new UntypedFormGroup({
            search: new UntypedFormControl(null)
        });
    }

    logout() {
        this.authService.logout();
    }

    onToggleMenuSidebar() {
        this.uiService.toggleSidebar();
    }
}
