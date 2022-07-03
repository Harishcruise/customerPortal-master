import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router,private snack:MatSnackBar) {
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

  Invoice(CustId: Number, DocNum: string):Observable<any>{
    return this.http.post('http://localhost:3000/invoice',{username:CustId,password:DocNum})
  }

  LoginData(){
    return this.http.get('http://localhost:3000/getloginData');
  }
  

  getLoginRes(user: Number , password: Number ){
    this.http.post('http://localhost:3000/postloginData',{username:user}).subscribe(
    response =>{
      console.log(response)
    }
  )
    return this.http.post(this.baseUrl,{
      username:user,
      password:password
    }).subscribe(
      response =>{
        console.log(response)
        this.Data = JSON.parse(JSON.stringify(response));
        console.log(this.Data);
        if(this.Data.E_BAPIRET.TYPE === 'S'){
          localStorage.setItem("cust",''+user);
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
