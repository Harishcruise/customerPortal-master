import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit {

  profile : Boolean =false;
  enquiry : Boolean =false;
  sale : Boolean =false;
  delivery : Boolean =false;
  overview : Boolean =true;
  ProfileData;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.profileDet();
    // console.log(this.ProfileData);
  }
  
  LogOut(){
    localStorage.clear();
  }
  prof(){
    this.profile=true;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
  }
  enq(){
    this.profile=false;
    this.enquiry=true;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
  }
  sa(){
    this.profile=false;
    this.enquiry=false;
    this.sale=true;
    this.delivery=false;
    this.overview=false;
  }
  deli(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=true;
    this.overview=false;
  }
  over(){
    console.log("sd")
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=true;
  }


  profileDet(){
    console.log(this.auth.Profile(7));
    this.auth.Profile(7);
    console.log(this.auth.getProfile());
    // this.ProfileData=this.auth.ProfileData;
  }

}
