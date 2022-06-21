import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { HomePageComponent } from './homePage/homePage.component';


const routes: Routes = [
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
