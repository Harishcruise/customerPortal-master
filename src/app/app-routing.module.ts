import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { HomePageComponent } from './homePage/homePage.component';
import { VendorLoginComponent } from './Vendor-login/Vendor-login.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';

const routes: Routes = [
  {
    path:'vendorLogin',
    component:VendorLoginComponent,
  },
  {
    path:'vendorDashboard',
    component:VendorDashboardComponent,
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
