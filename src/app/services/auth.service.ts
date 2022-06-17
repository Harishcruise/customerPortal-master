import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router,private toast: ToastrService,private snack:MatSnackBar) {
   }
  LogInUserName : string='' ;
  baseUrl : string='http://localhost:3000/login';
  
  Data;
  ProfileData;
  DeliveryData;


  LoggedIn(userName : string){
    this.LogInUserName=userName;
  }

  Profile(cusId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/profile',{username:cusId})
  }

  Delivery(CustId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/delivery',{username:CustId});
  }

  Sale(CustId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/sale',{username:CustId})
  }

  Payment(CustId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/pay',{username:CustId})
  }

  Credit(CustId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/credit',{username:CustId})
  }

  Inquiry(CustId: Number):Observable<any>{
    return this.http.post('http://localhost:3000/inquiry',{username:CustId})
  }


  getLoginRes(user: Number , password: Number ){
    return this.http.post(this.baseUrl,{
      username:user,
      password:password
    }).subscribe(
      response =>{
        console.log(response)
        this.Data = JSON.parse(JSON.stringify(response));
        console.log(this.Data);
        if(this.Data.E_BAPIRET.TYPE === 'S'){
          sessionStorage.setItem(''+user,''+password);
          this.router.navigateByUrl('/home');
        }
        else{
          console.log("Invalid us")
          this.snack.open('Invalid Username Password', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          // this.toast.error("Invalid User Name Password","Error");
        }
      }
    )
  }
}
