import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './pages/timesheet/timesheet.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeRegistrationComponent } from './pages/employee-registration/employee-registration.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path:"timesheet",
    component:TimesheetComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"employee-registration",
    component:EmployeeRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
