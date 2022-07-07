import { Component, OnInit,OnChanges, ElementRef, Renderer2, ViewChild, AfterViewInit,SimpleChanges , ViewEncapsulation,Inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmpserviceService } from '../services/empservice.service';
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
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  load : Boolean = true;
  content : Boolean =false;
  profile : Boolean =true;
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
  LeaveData;
  PayData;
  PayPdfData;
  // PaymentData;
  // CreditMemoData;
  // InquiryData;
  // InvoiceData;
  // payementData2;
  // accType;
  // credetType;
  leaveBalanceDataArray: any[]=[];
  leaveDetailDataArray: any[]=[];
  PayDataArray: any[]=[];
  SaleDataArray: any[]=[];
  PaymentDataArray: any[]=[];
  CreditMemoDataArray: any[]=[];
  DebitMemoDataArray: any[]=[];
  InquiryDataArray: any[]=[];
  InvoiceDataArray: any[]=[];
  loginData;
  ResultForm = this.fb.group({
    Cust:[''],
    Doc:[''],
  })
  constructor(private auth: AuthService,private Empauth: EmpserviceService,private router: Router, private resolve:ActivatedRoute,private http: HttpClient,private fb:FormBuilder,private dialog:MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    this.loginData = await this.Empauth.LoginData().toPromise();
    console.log(this.loginData);
    this.ProfileData= await this.Empauth.Profile(this.loginData).toPromise();
    this.LeaveData= await this.Empauth.Leave(this.loginData).toPromise();
    this.PayData= await this.Empauth.Paysilp(this.loginData).toPromise();
    
    console.log(this.ProfileData,this.LeaveData,this.PayData);
    this.leaveDetailDataArray = [...this.LeaveData.IT_LEAVE_DETAIL.item];
    this.leaveBalanceDataArray = [...this.LeaveData.IT_LEAVE_BALANCE.item];
    this.PayDataArray = [...this.PayData.PAYSLIP_DET.item]
    this.leaveBalanceDataArray.shift();
    console.log(this.leaveBalanceDataArray);
    this.content = true;
    this.load = false;
  }

  async getPdf(Seq:Number){
    this.PayPdfData = await this.Empauth.PayPdf(3,Seq).toPromise();
    console.log(this.PayPdfData)
    const linkSource = `data:application/pdf;base64,${this.PayPdfData.BASE64}`;
    const downloadLink = document.createElement("a");
    const fileName = "payslip.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
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
}
