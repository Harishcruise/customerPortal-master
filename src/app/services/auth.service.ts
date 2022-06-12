import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) {
    return this.ProfileData;
   }
  LogInUserName : string='' ;
  baseUrl : string='http://localhost:3000/login';
  
  Data;
  ProfileData;
  LoggedIn(userName : string){
    this.LogInUserName=userName;
  }

  Profile(cusId: Number){
    this.http.post('http://localhost:3000/profile',{username:cusId}).subscribe(
      response =>{
        this.ProfileData = JSON.parse(JSON.stringify(response));
        console.log(this.ProfileData);
        return JSON.parse(JSON.stringify(response));
        // console.log(this.ProfileData);
        // console.log(response);
        // return JSON.parse(JSON.stringify(response));
      }
    )
  }

  getProfile(){
    return this.ProfileData;
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
          localStorage.setItem(''+user,''+password);
          this.router.navigateByUrl('/home');
        }
        else{
          console.log("Invalid us")
        }
      }
    )
  }
}
