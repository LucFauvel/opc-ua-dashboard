import {Component, HostBinding, OnInit, Renderer2} from '@angular/core';
import { UiService } from '@services/ui.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    @HostBinding('class') class = 'wrapper';
    constructor(private renderer: Renderer2, private uiService: UiService) {}

    ngOnInit() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.renderer.addClass(
            document.querySelector('app-root'),
            'layout-fixed'
        );
    }

    onToggleMenuSidebar() {
        this.uiService.toggleSidebar();
    }
}
