import { Component, OnInit,OnChanges, ElementRef, Renderer2, ViewChild, AfterViewInit,SimpleChanges , ViewEncapsulation,Inject,Pipe} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  // encapsulation: ViewEncapsulation.None
})

export class AppDialog{
  title = 'htmltopdf';
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  Item;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
      console.log(data);
      this.Item = JSON.parse(JSON.stringify(data.data));
      console.log(this.Item);
  }
  downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     console.log(html);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }
}

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
  invoice : Boolean = false;
  expandBool : Boolean = true;
  expand: string = 'expand_more';
  ProfileData;
  DeliveryData;
  SaleData;
  PaymentData;
  CreditMemoData;
  InquiryData;
  InvoiceData;
  payementData2;
  // accType;
  // credetType;
  paymentDataArray2: any[]=[];
  paymentDataArray3: any[]=[];
  DeliveryDataArray: any[]=[];
  SaleDataArray: any[]=[];
  PaymentDataArray: any[]=[];
  CreditMemoDataArray: any[]=[];
  DebitMemoDataArray: any[]=[];
  InquiryDataArray: any[]=[];
  InvoiceDataArray: any[]=[];
  VBELN: any;
  ResultForm = this.fb.group({
    Cust:[''],
    Doc:[''],
  })
  loginData;
  filterEnquiryData: string ='';
  
  constructor(private auth: AuthService,private router: Router, private resolve:ActivatedRoute,private http: HttpClient,private fb:FormBuilder,private dialog:MatDialog) {
  
  }
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  livedate = this.today.toLocaleDateString();
  time;
  day;
  ngOnInit() {
    // this.auth.init(12).subscribe(([res1,res2])=>{
    //   this.ProfileData=JSON.parse(JSON.stringify(res1));
    //   this.DeliveryData=JSON.parse(JSON.stringify(res2));
    // })
    this.getData();
    console.log(this.day);
    // this.render=true; 
  }

  exp() {
    this.expandBool = !this.expandBool;
    this.expand = this.expandBool ? 'expand_more' : 'expand_less';
  }
  
  async getResult(){
    this.InvoiceData = await this.auth.Invoice(12,this.ResultForm.value.Doc).toPromise();
    console.log(this.InvoiceData.INV_DET.item);
    this.InvoiceDataArray = [...this.InvoiceData.INV_DET.item];
    this.InvoiceDataArray.map((value)=>{
        if(value.SHKZG === 'S'){
            value.PARGB = "Credit";
        }
        else if(value.SHKZG === 'H')
        value.PARGB = "Debit";

        if(value.KOART === 'A'){
          value.DIEKZ = "Assets"
        }
        else if(value.KOART === 'D'){
          value.DIEKZ = "Customers"
        }
        else if(value.KOART === 'K'){
          value.DIEKZ = "Vendors"
        }
        else if(value.KOART === 'M'){
          value.DIEKZ = "Material"
        }
        else if(value.KOART === 'S'){
          value.DIEKZ = "G/L Account"
        }
    })
    // const dialogRef = this.dialog.open(AppDialog);
    
  }
  getInvoice(data){
    const dialogRef = this.dialog.open(AppDialog,{data:{data:data}});
  }

  async getData(){
    this.loginData = await this.auth.LoginData().toPromise();
    console.log(this.loginData);
    this.ProfileData= await this.auth.Profile(this.loginData).toPromise();
    this.DeliveryData= await this.auth.Delivery(12).toPromise();
    this.SaleData = await this.auth.Sale(12).toPromise();
    this.PaymentData = await this.auth.Payment(12).toPromise();
    this.CreditMemoData = await this.auth.Credit(12).toPromise();
    this.InquiryData = await this.auth.Inquiry(12).toPromise();
    this.payementData2 = await this.auth.Invoice(12,this.ResultForm.value.Doc).toPromise(); 
    console.log(this.ProfileData,this.DeliveryData,this.SaleData,this.PaymentData,this.CreditMemoData,this.InquiryData,this.DebitMemoDataArray.length);
    this.DeliveryDataArray = [...this.DeliveryData.IT_DELIVERY.item];
    this.SaleDataArray = [...this.SaleData.E_SALESORDER.item];
    this.PaymentDataArray = [...this.PaymentData.IT_DET.item];
    this.CreditMemoDataArray = [...this.CreditMemoData.IT_CRE.item];
    this.DebitMemoDataArray = [...this.CreditMemoData.IT_DEB.item];
    this.InquiryDataArray = [...this.InquiryData.INQ_DET.item];
    this.paymentDataArray2 = [...this.payementData2.INV_DET.item];
    this.paymentDataArray2.map((value)=>{
      console.log(value);
        if(value.KOART==='S')  {
          this.paymentDataArray3.push(value);
        }
    })
    this.paymentDataArray3.map((value)=>{
      if(value.PSWSL === "EUR"){
        var due_date = new Date(value.MADAT);
        this.time = this.today.getTime() - due_date.getTime();
        this.day = this.time / (1000 * 3600 * 24);
        if(Math.floor(this.day)>0){

          value.PSWSL = Math.floor(this.day);

        }
      }
      if(value.SHKZG === 'H' ){
        value.PARGB = "Completed"
      }
      else if(value.SHKZG === 'S'){
        value.PARGB = "Exceeded"
      }
    })
    console.log(this.paymentDataArray3);

  }

  
  LogOut(){
    localStorage.clear();
    this.router.navigate(["/main"])
    
  }
  prof(){
    this.profile=true;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
    this.invoice=false;
  }
  enq(){
    this.profile=false;
    this.enquiry=true;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
    this.invoice=false;
  }
  sa(){
    this.profile=false;
    this.enquiry=false;
    this.sale=true;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
    this.invoice=false;
  }
  deli(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=true;
    this.overview=false;
    this.payment=false;
    this.credit=false;
    this.invoice=false;
  }
  over(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=true;
    this.payment=false;
    this.credit=false;
    this.invoice=false;

  }
  pay(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=true;
    this.credit=false;
    this.invoice=false;
  }
  cred(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=true;
    this.invoice=false;
  }
  inv(){
    this.profile=false;
    this.enquiry=false;
    this.sale=false;
    this.delivery=false;
    this.overview=false;
    this.payment=false;
    this.credit=false;
    this.invoice=true;
  }


}

