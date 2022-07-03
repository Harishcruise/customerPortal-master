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
export class EmpserviceService {
  LogInUserName : string='' ;
  Data;
constructor(private http: HttpClient,private router: Router,private snack:MatSnackBar) { }
LoggedIn(userName : string){
  this.LogInUserName=userName;
}

LoginData(){
  return this.http.get('http://localhost:3000/getloginData');
}

Login(cusId: Number,pass:Number){
  this.http.post('http://localhost:3000/postloginData',{username:cusId}).subscribe(
    response =>{
      console.log(response)
    }
  )
  return this.http.post('http://localhost:3000/EmployeeLogin',{
    username:cusId,
    password:pass
  }).subscribe(
    response =>{
      console.log(response)
      this.Data = JSON.parse(JSON.stringify(response));
      console.log(this.Data);
      if(this.Data.RESULT === 1){
        localStorage.clear();
        localStorage.setItem("emp",''+cusId);
        this.router.navigateByUrl('/EmployeeDashboard');
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

Profile(cusId: Number):Observable<any>{
  return this.http.post('http://localhost:3000/EmployeeProfile',{username:cusId})
}

Paysilp(cusId: Number):Observable<any>{
  return this.http.post('http://localhost:3000/EmployeePayslip',{username:cusId})
}

Leave(cusId: Number):Observable<any>{
  return this.http.post('http://localhost:3000/EmployeeLeave',{username:cusId})
}

PayPdf(cusId: Number,Seqno: Number):Observable<any>{
  return this.http.post('http://localhost:3000/EmployeePayslipPdf',{username:cusId,password:Seqno})
}
}
