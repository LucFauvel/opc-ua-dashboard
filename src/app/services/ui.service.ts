import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const MENU_STATUS_STORAGE_KEY = "menuSidebarCollapsed"

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private renderer: Renderer2;
    private menuSidebarCollapsed$: BehaviorSubject<boolean>;

    constructor(private rendererFactory: RendererFactory2,) {
        this.renderer = this.rendererFactory.createRenderer(null, null);

        //Sidebar
        this.menuSidebarCollapsed$ = new BehaviorSubject(window.localStorage.getItem(MENU_STATUS_STORAGE_KEY) === 'true');
        this.menuSidebarCollapsed$.subscribe((isCollapsed) => {
            if (isCollapsed) {
                this.renderer.removeClass(
                    document.querySelector('app-root'),
                    'sidebar-open'
                );
                this.renderer.addClass(
                    document.querySelector('app-root'),
                    'sidebar-collapse'
                );
            } else {
                this.renderer.removeClass(
                    document.querySelector('app-root'),
                    'sidebar-collapse'
                );
                this.renderer.addClass(
                    document.querySelector('app-root'),
                    'sidebar-open'
                );
            }

        })
    }

    public toggleSidebar() {
        const storedSidebarStatus = window.localStorage.getItem(MENU_STATUS_STORAGE_KEY) === 'true';
        const newValue = !storedSidebarStatus;
        this.menuSidebarCollapsed$.next(newValue)
        window.localStorage.setItem(MENU_STATUS_STORAGE_KEY, String(newValue));
    }
}