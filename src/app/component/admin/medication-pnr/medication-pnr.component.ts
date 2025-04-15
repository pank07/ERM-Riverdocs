import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
@Component({
  selector: 'app-medication-pnr',
  templateUrl: './medication-pnr.component.html',
  styleUrls: ['./medication-pnr.component.css']
})
export class MedicationPnrComponent implements OnInit {
  updateForm!: FormGroup;
  userId: any



  constructor(
    private service:AllService,
    private route: Router,
    private fb:FormBuilder,
    private swet:SweetalertssService
  ){
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.updateForm = this.fb.group({

      user_id: [this.userId],

      allergies: [''],
      expiry_date: [''],
      medicine_name: [''],
      medicine_restrictions: [''],
      mfg_date: [''],
      precautions: [''],
      quantity: [''],
      side_effect: [''],
      status: [''],
      unit: [''],

    })
  }

  allData :any[] = []
  ngOnInit(): void {
    this.getmedicinesusers();
    
  }

  getmedicinesUser:any=[];
  getmedicinesusers(): void {
    this.service.getprnmedicine().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res;  
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  id: any;
  nurseByIdData: any = [];
  pnrmedicinegetById(data: any) {
    this.id = data;
    this.service.GetBypnrmedicine_detailss(data).subscribe((res: any) => {
      this.nurseByIdData = res[0];
    })
  }

  private addUserIdToPayload(payload: any): any {
    payload.user_id = this.userId;
    return payload;
  }

  editmedicine() {
    this.nurseByIdData = this.addUserIdToPayload(this.nurseByIdData);
    this.service.editpnrmedicines(this.id, this.nurseByIdData).subscribe((res: any) => {
    
      const titless = res.medicine_name
      this.swet.SucessToast(`updated successfully  ${titless}`)
      // window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);

    });
  }


}
