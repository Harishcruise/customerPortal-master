import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { EmpDashGuardGuard } from './guard/emp-dash-guard.guard';
import { EmpLoginGuardGuard } from './guard/emp-login-guard.guard';
import { VendDashGuardGuard } from './guard/vend-dash-guard.guard';
import { VendLoginGuardGuard } from './guard/vend-login-guard.guard';
import { HomePageComponent } from './homePage/homePage.component';
import { VendorLoginComponent } from './Vendor-login/Vendor-login.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path:'EmployeeLogin',
    component:EmployeeLoginComponent,
    canActivate:[EmpLoginGuardGuard],
  },
  {
    path:'EmployeeDashboard',
    component:EmployeeDashboardComponent,
    canActivate:[EmpDashGuardGuard],
  },
  {
    path:'vendorLogin',
    component:VendorLoginComponent,
    canActivate:[VendLoginGuardGuard],
  },
  {
    path:'vendorDashboard',
    component:VendorDashboardComponent,
    canActivate:[VendDashGuardGuard],
  },
  {
    path:'home',
    component:LandingPageComponent,
    canActivate:[AuthGuardGuard],
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[LoginGuardGuard]
  },
  {
    path:'main',
    component:HomePageComponent,
  },
  {
    path:'',
    redirectTo: '/main',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
