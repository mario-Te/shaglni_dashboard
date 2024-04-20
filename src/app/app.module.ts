import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { DefaultTableComponent } from './default-table/default-table.component';
import { UsersComponent } from './users/users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobsComponent } from './jobs/jobs.component';
import { HomepageTemplateComponent } from './homepage-template/homepage-template.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    LoginComponent,
    DefaultTableComponent,
    UsersComponent,
    JobsComponent,
    HomepageTemplateComponent,
    SidenavComponent,
    ApplicantsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    DialogModule,
    FontAwesomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}