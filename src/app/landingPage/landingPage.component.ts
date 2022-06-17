import { Component, OnInit,OnChanges, ElementRef, Renderer2, ViewChild, AfterViewInit,SimpleChanges , ViewEncapsulation} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-landingPage',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {
  profile : Boolean =false;
  enquiry : Boolean =false;
  sale : Boolean =false;
  delivery : Boolean =false;
  overview : Boolean =true;
  payment : Boolean = false;
  credit : Boolean = false;
  expandBool : Boolean = true;
  expand: string = 'expand_more';
  ProfileData;
  DeliveryData;
  SaleData;
  PaymentData;
  CreditMemoData;
  InquiryData;
  DeliveryDataArray: any[]=[];
  SaleDataArray: any[]=[];
  PaymentDataArray: any[]=[];
  CreditMemoDataArray: any[]=[];
  DebitMemoDataArray: any[]=[];
  InquiryDataArray: any[]=[];
  constructor(private auth: AuthService,private router: Router, private resolve:ActivatedRoute,private http: HttpClient) {
  
  }
  ngOnInit() {
    // this.auth.init(12).subscribe(([res1,res2])=>{
    //   this.ProfileData=JSON.parse(JSON.stringify(res1));
    //   this.DeliveryData=JSON.parse(JSON.stringify(res2));
    // })
    this.getData();
    // this.render=true; 
  }

  exp() {
    this.expandBool = !this.expandBool;
    this.expand = this.expandBool ? 'expand_more' : 'expand_less';
  }

  async getData(){
    this.ProfileData= await this.auth.Profile(parseInt(this.auth.LogInUserName)).toPromise();
    this.DeliveryData= await this.auth.Delivery(12).toPromise();
    this.SaleData = await this.auth.Sale(12).toPromise();
    this.PaymentData = await this.auth.Payment(12).toPromise();
    this.CreditMemoData = await this.auth.Credit(12).toPromise();
    this.InquiryData = await this.auth.Inquiry(12).toPromise();
    console.log(this.ProfileData,this.DeliveryData,this.SaleData,this.PaymentData,this.CreditMemoData,this.InquiryData,this.DebitMemoDataArray.length);
    this.DeliveryDataArray = [...this.DeliveryData.IT_DELIVERY.item];
    this.SaleDataArray = [...this.SaleData.E_SALESORDER.item];
    this.PaymentDataArray = [...this.PaymentData.IT_DET.item];
    this.CreditMemoDataArray = [...this.CreditMemoData.IT_CRE.item];
    this.DebitMemoDataArray = [...this.CreditMemoData.IT_DEB.item];
    this.InquiryDataArray = [...this.InquiryData.INQ_DET.item];
  }

  
  LogOut(){
    sessionStorage.clear();
    this.router.navigate(["/login"])
    
  }
  prof(){
    this.profile=true;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
  }
  enq(){
    this.profile=false;
    this.enquiry=true;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
  }
  sa(){
    this.profile=false;
    this.enquiry=false;
    this.sale=true;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
  }
  deli(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=true;
    this.overview=false;
    this.payment=false;
    this.credit=false;
  }
  over(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=true;
    this.payment=false;
    this.credit=false;

  }
  pay(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=true;
    this.credit=false;
  }
  cred(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=true;
  }


}
