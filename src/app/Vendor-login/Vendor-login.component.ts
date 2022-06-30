import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { VendorserviceService } from '../services/vendorservice.service';
@Component({
  selector: 'app-Vendor-login',
  templateUrl: './Vendor-login.component.html',
  styleUrls: ['./Vendor-login.component.css']
})
export class VendorLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth: AuthService, private router: Router,private vendAuth:VendorserviceService ) { }

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
    // this.router.navigateByUrl('/vendorDashboard')
    // console.log(this.LoginForm.value);
    // this.auth.LoggedIn(this.LoginForm.value.UserName);
    this.vendAuth.getLoginRes(this.LoginForm.value.UserName,this.LoginForm.value.Password);
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
