import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { JobsComponent } from './jobs/jobs.component';
import { HomepageTemplateComponent } from './homepage-template/homepage-template.component';
import { ApplicantsComponent } from './applicants/applicants.component';

const routes: Routes = [


  { path: "login", component: LoginComponent },
  {
    path: "home", component: HomepageTemplateComponent, canActivate: [AuthGuard], children: [
      {
        path: 'companies',
        component: HomeComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      }, {
        path: 'applicants',
        component: ApplicantsComponent,
        canActivate: [AuthGuard],
      }
    ]
  },


  { path: '**', redirectTo: 'home/companies' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
