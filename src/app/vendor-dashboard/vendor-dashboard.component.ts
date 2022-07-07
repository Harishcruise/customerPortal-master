import { Component, OnInit,OnChanges, ElementRef, Renderer2, ViewChild, AfterViewInit,SimpleChanges , ViewEncapsulation,Inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VendorserviceService } from '../services/vendorservice.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendorDialog.html',
  // encapsulation: ViewEncapsulation.None
})
export class AppVendorDialog implements OnInit{
  title = 'htmltopdf';
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  Item;
  Item2;
  Total:number =0;
  ItemArray: any[]=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
      console.log(data);
      this.Item = JSON.parse(JSON.stringify(data.data));
      this.Item2 = JSON.parse(JSON.stringify(data.data2));
      console.log(this.Item,this.Item2,this.Item.length);

      
  }
  ngOnInit() {
    // this.ItemArray = [...this.Item];
    if(this.Item.length === undefined){
      this.ItemArray[0]=this.Item
    }
    else{
      this.ItemArray = this.Item;
    }
    this.ItemArray.map((value)=>{
      this.Total = this.Total + parseInt(value.WRBTR); 
    })
    console.log(this.ItemArray)
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
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {
  load : Boolean = true;
  content : Boolean =false;
  profile : Boolean =false;
  enquiry : Boolean =false;
  sale : Boolean =false;
  delivery : Boolean =false;
  overview : Boolean =true;
  payment : Boolean = false;
  credit : Boolean = false;
  invoice : Boolean = false;
  expandBool : Boolean = true;
  VBELN : string ='';
  expand: string = 'expand_more';
  ProfileData;
  GoodsData;
  PurchaseData;
  PaymentData;
  CreditMemoData;
  DebitMemoData;
  RfqData;
  InvoiceListData;
  InvoiceDetData;
  GoodsDataArray: any[]=[];
  PurchaseDataArray: any[]=[];
  PaymentDataOpenArray: any[]=[];
  PaymentDataCloseArray: any[]=[];
  CreditMemoDataArray: any[]=[];
  DebitMemoDataArray: any[]=[];
  RfqDataArray: any[]=[];
  GoodsItemArray: any[]=[];
  RfqItemArray: any[]=[];
  PurchaseOrderItemArray: any[]=[];
  InvoiceListDataArray: any[]=[];
  loginData;
  ResultForm = this.fb.group({
    Cust:[''],
    Doc:[''],
  })
  today = new Date();
  livedate = this.today.toLocaleDateString();
  time;
  day;
 dd = String(this.today.getDate()).padStart(2, '0');
mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
yyyy = this.today.getFullYear();

dateString = this.mm + '-' + this.dd + '-' + this.yyyy;
  constructor(private auth: AuthService,private router: Router, private resolve:ActivatedRoute,private http: HttpClient,private fb:FormBuilder,private dialog:MatDialog,private vendAuth:VendorserviceService) { }

  ngOnInit() {
    // const dialogRef = this.dialog.open(AppVendorDialog,{data:{data:"hello"}});
    this.getData();
    
  }

  async getInvdata(num:Number){
    this.InvoiceDetData = await this.vendAuth.InvoiceDet(num).toPromise();
    console.log(this.InvoiceDetData);
    const dialogRef = this.dialog.open(AppVendorDialog,{data:{data:this.InvoiceDetData.INV_DET.item,data2:this.InvoiceListData.INV_LIST.item}});
   
  }


  async getData(){
    this.loginData = await this.vendAuth.LoginData().toPromise();
    console.log(this.loginData);
    this.ProfileData= await this.vendAuth.Profile(this.loginData).toPromise();
    this.GoodsData= await this.vendAuth.Goods(this.loginData).toPromise();
    this.PurchaseData = await this.vendAuth.Purchase(this.loginData).toPromise();
    this.PaymentData = await this.vendAuth.Payment(this.loginData).toPromise();
    this.CreditMemoData = await this.vendAuth.Credit(this.loginData).toPromise();
    this.DebitMemoData = await this.vendAuth.Debit(this.loginData).toPromise();
    this.RfqData = await this.vendAuth.Rfq(5).toPromise();
    this.InvoiceListData = await this.vendAuth.InvoiceList(this.loginData).toPromise();

    console.log(this.ProfileData,this.GoodsData,this.PurchaseData,this.PaymentData,this.CreditMemoData,this.DebitMemoData,this.RfqData,this.InvoiceListData);
    // this.GoodsDataArray = [...this.GoodsData.T_GOODS_VALUES.item];
    this.GoodsDataArray = [...this.GoodsData.T_GOODS_HEAD.item];
    // this.PurchaseDataArray = [...this.PurchaseData.IT_ITEM.item];
    this.PurchaseDataArray = [...this.PurchaseData.IT_HEADER.item];
    this.PaymentDataCloseArray = [...this.PaymentData.T_CLOSE.item];
    this.PaymentDataOpenArray = [...this.PaymentData.T_OPEN.item];
    this.CreditMemoDataArray = [...this.CreditMemoData.IT_CREDIT.item];
    this.DebitMemoDataArray = [...this.DebitMemoData.IT_DEBIT.item];
    this.RfqDataArray = [...this.RfqData.RFQ_HEAD.item];
    this.InvoiceListDataArray = [...this.InvoiceListData.INV_LIST.item];
    this.GoodsItemArray = [...this.GoodsData.T_GOODS_VALUES.item]
    this.RfqItemArray = [...this.RfqData.RFQ_VALUES.item]
    this.PurchaseOrderItemArray = [...this.PurchaseData.IT_ITEM.item]
    this.PaymentDataOpenArray.map((value)=>{
      var base_date = new Date(value.BLINE_DATE);
      this.time = this.today.getTime() - base_date.getTime();
      this.day = this.time / (1000 * 3600 * 24);
      if(Math.floor(this.day)>0){

        value.DRAWEE = Math.floor(this.day);

      }
    })
    this.GoodsDataArray.shift()
    this.GoodsItemArray.shift()
      this.PurchaseDataArray.shift()
    this.PurchaseOrderItemArray.shift()
    this.RfqDataArray.shift()
    this.RfqItemArray.shift()
    this.CreditMemoDataArray.shift()
    this.DebitMemoDataArray.shift()
    this.content = true;
    this.load = false;
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
