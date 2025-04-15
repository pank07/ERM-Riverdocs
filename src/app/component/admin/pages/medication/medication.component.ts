import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent {

  updateForm!: FormGroup;
  userId: any
  allData: any[] = []
  getmedicinesUser: any = [];
  
  constructor(
    private service: AllService,
    private swet: SweetalertssService,
    private fb: FormBuilder
  ) {
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


  ngOnInit(): void {
    this.getmedicinesusers();

  }

 
  getmedicinesusers(): void {
    this.service.getmedicines().subscribe({
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
  medicinegetById(data: any) {
    this.id = data;
    this.service.GetBymedicine_detailss(data).subscribe((res: any) => {
      this.nurseByIdData = res[0];
    })
  }

  private addUserIdToPayload(payload: any): any {
    payload.user_id = this.userId;
    return payload;
  }

  editmedicine() {
    this.nurseByIdData = this.addUserIdToPayload(this.nurseByIdData);
    this.service.editGetBymedicines(this.id, this.nurseByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
      const titless = res.medicine_name
      this.swet.SucessToast(`updated successfully  ${titless}`)
      // window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);

    });
  }




}

