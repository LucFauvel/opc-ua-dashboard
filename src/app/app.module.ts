import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {ButtonComponent} from './components/button/button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from 'environments/environment';
import { MachinesComponent } from '@pages/machines/machines.component';
import { ApiModule } from './api/api.module';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        DashboardComponent,
        ButtonComponent,
        UserComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        SelectComponent,
        CheckboxComponent,
        MachinesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        AuthModule.forRoot({
            domain: environment.authDomain,
            clientId: environment.authClientId,
            audience: environment.apiRootUrl,
            httpInterceptor: {
                allowedList: [
                    {
                      uri: environment.apiRootUrl + '/*',
                      tokenOptions: {
                        audience: environment.apiRootUrl,
                      }
                    }
                  ]
            }
        }),
        ApiModule.forRoot({
            rootUrl: environment.apiRootUrl
        }),
        FormsModule,
        NgChartsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
