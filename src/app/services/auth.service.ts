import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }
  baseUrl : string='http://localhost:3000/login';
  LogInUserName : string='' ;
  Data;
  LoggedIn(userName : string){
    this.LogInUserName=userName;
  }
  getLoginRes(user: Number , password: Number ){
    return this.http.post(this.baseUrl,{
      username:user,
      password:password
    }).subscribe(
      response =>{
        console.log(response)
        this.Data = JSON.parse(JSON.stringify(response));
        console.log(this.Data.E_RETURN);
        if(this.Data.E_RETURN === 'S'){
          localStorage.setItem(''+user,''+password);
          this.router.navigateByUrl('/home');
        }
        else{
          console.log("Invalid")
        }
      }
    )
  }
}
