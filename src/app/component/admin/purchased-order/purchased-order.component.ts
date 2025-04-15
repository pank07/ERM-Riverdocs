import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-purchased-order',
  templateUrl: './purchased-order.component.html',
  styleUrls: ['./purchased-order.component.css']
})
export class PurchasedOrderComponent implements OnInit {
  sendMailForm:FormGroup;
  receiveOrderForm: FormGroup;

  filteredData: any[] = [];
  filterKeys: { pharmacy_name?: string; medsname?: string; startDate?: Date; endDate?: Date } = {};
  userId: number | null;
  groupId:number | null;
  constructor(private api:AllService,private fb:FormBuilder){
    const userIdString = this.api.getlocalstoragevalue('userId');

    const grpId = this.api.getlocalstoragevalue('group_id')

    this.groupId = grpId ? parseInt(grpId, 10) : null;
    console.log( 'group id' , this.groupId );

    

    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    // console.log('user id' , this.userId);
    
    this.sendMailForm = this.fb.group({
      supplier_id: [''],
      order_id: [''],
      text: [''],
      subject: [''],
      supplier_mail: [''],
      issue_by: [this.userId]
    });

    this.receiveOrderForm = this.fb.group({
      medicine_id:[''],
      medicine_name:[''],
      quantity:[''],
      mfg_date:[''],
      expiry_date:[''],
    })
  }

  receiveOrder(){
    console.log('order receive form',this.receiveOrderForm.value);
    this.api.orderHistory( this.receiveOrderForm.value).subscribe((res:any)=>{
      this.api.clickwindowlocation();
    })
  }

  setModalData(purchase: any) {
    this.receiveOrderForm.patchValue({
      medicine_id: purchase.medicine_id,
      medicine_name: purchase.medicine_name,
      mfg_date: purchase.mfg_date,
      exp_date: purchase.exp_date,
    });
  }

  postMail(){
    this.api.mailSend(this.sendMailForm.value).subscribe((res:any)=>{
      window.location.reload();
    })
  }

  ngOnInit(): void {
    this.getOrder();
  }

  allData:any;
  getOrder() {
    this.api.getPurchaseOrder().subscribe((res: any) => {
      this.allData = res;
      this.filteredData = this.allData; // Initialize filteredData with allData
    });
  }

  filterData() {
    const { startDate, endDate } = this.filterKeys;
  
    this.filteredData = this.allData.filter((purchase:any) => {
      let matches = true;
  
      // Check for last_order_date and created_at within the date range
      if (startDate) {
        matches = matches && (
          (new Date(purchase.last_order_date) >= new Date(startDate)) || 
          (new Date(purchase.created_at) >= new Date(startDate))
        );
      }
  
      if (endDate) {
        matches = matches && (
          (new Date(purchase.last_order_date) <= new Date(endDate)) || 
          (new Date(purchase.created_at) <= new Date(endDate))
        );
      }
  
      return matches;
    });
  }
  

}