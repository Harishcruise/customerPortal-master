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
export class VendorserviceService {
  LogInUserName : string='' ;
  Data;
constructor(private http: HttpClient,private router: Router,private snack:MatSnackBar) { }
LoggedIn(userName : string){
  this.LogInUserName=userName;
}

Profile(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorProfile',{username:vendID})
}

Goods(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorGoods',{username:vendID});
}

Purchase(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorPurchase',{username:vendID})
}

Payment(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorPayment',{username:vendID})
}

Credit(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorCredit',{username:vendID})
}

Debit(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorDebit',{username:vendID})
}

Rfq(vendID: Number):Observable<any>{
  return this.http.post('http://localhost:3000/vendorRfq',{username:vendID})
}

InvoiceList(vendID: string):Observable<any>{
  return this.http.post('http://localhost:3000/vendorInvoiceList',{customerno:vendID})
}

InvoiceDet(vendID: Number):Observable<any>{
  return this.http.post('http://localhost:3000/vendorInvoiceDet',{invoiceno:vendID})
}

getLoginRes(user: string , password: Number ){
  return this.http.post("http://localhost:3000/vendorLogin",{
    username:user,
    password:password
  }).subscribe(
    response =>{
      console.log(response)
      this.Data = JSON.parse(JSON.stringify(response));
      console.log(this.Data);
      if(this.Data.BAPIRET.TYPE === 'S'){
        sessionStorage.setItem(''+user,''+password);
        this.router.navigateByUrl('/vendorDashboard');
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
