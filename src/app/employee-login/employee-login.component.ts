import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { EmpserviceService } from '../services/empservice.service';
@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router,private Empauth: EmpserviceService ) { }
  hide : Boolean = true;

  type : string = 'visibility';

  LoginForm = this.fb.group({
    UserName:[''],
    Password:[''],
  })

  VisOff(){
    this.hide= !this.hide;
    this.type= this.hide? 'visibility' : 'visibility_off'
  }
  ngOnInit() {
  }
  Login(){
    // this.router.navigateByUrl('/EmployeeDashboard');
    // this.auth.Profile(7);
    // this.auth.Delivery(12);
    // console.log(this.LoginForm.value);
    this.Empauth.LoggedIn(this.LoginForm.value.UserName);
    this.Empauth.Login(parseInt(this.LoginForm.value.UserName),this.LoginForm.value.Password);
    // console.log(this.auth.LogInUserName);
    // if(this.auth.Data.E_RETURN === 'S'){
    //   localStorage.setItem(this.LoginForm.value.UserName,this.LoginForm.value.Password);
    //   this.router.navigateByUrl('/home');
    // }
    // else{
    //   console.log("Invalid");
    // }
  }
}
