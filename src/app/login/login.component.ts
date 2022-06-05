import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router ) { 
    console.log(this.hide,this.type)
  }

  ngOnInit() {
  }

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
  
  Login(){
    console.log(this.LoginForm.value);
    this.auth.LoggedIn(this.LoginForm.value.UserName);
    this.auth.getLoginRes(parseInt(this.LoginForm.value.UserName),parseInt(this.LoginForm.value.Password));
    console.log(this.auth.LogInUserName);
    // if(this.auth.Data.E_RETURN === 'S'){
    //   localStorage.setItem(this.LoginForm.value.UserName,this.LoginForm.value.Password);
    //   this.router.navigateByUrl('/home');
    // }
    // else{
    //   console.log("Invalid");
    // }
  }

}
