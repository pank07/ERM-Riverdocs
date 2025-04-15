import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  updateForm!: FormGroup;
  userId: any

  constructor(
    private service: AllService,
    private swet: SweetalertssService,
    private fb: FormBuilder,
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.updateForm = this.fb.group({
      description: [''],
      title: [''],
      user_id: [this.userId],
    })
  }
  ngOnInit(): void {
    this.getmedicinesusers()
    this.units()

  }

  getmedicinesUser: any = []
  medeslength: any;
  getmedicinesusers(): void {
    this.service.getstatus().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res;

        this.medeslength = res.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  unitss: any = []
  units(): void {
    this.service.uinitsdata().subscribe({
      next: (res: any) => {
        this.unitss = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }




  id: any;
  nurseByIdData: any = [];
  allotedById(data: any) {
    this.id = data;
    this.service.GetByIDunits(data).subscribe((res: any) => {
      this.nurseByIdData = res[0];
    })
  }

  private addUserIdToPayload(payload: any): any {
    payload.user_id = this.userId;
    return payload;
  }

  editSideunitss() {
    this.nurseByIdData = this.addUserIdToPayload(this.nurseByIdData);
    this.service.editSideunits(this.id, this.nurseByIdData).subscribe((res: any) => {

      const titless = res.title
      this.swet.SucessToast(`updated successfully  ${titless}`)
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);

    });
  }

  // deleteGetByIDunitsss(itemDlt: any): void {
  //   this.service.deleteGetByIDunits(itemDlt.id).subscribe(
  //     () => {
  //       // window.location.reload()
  //     },
  //     (error) => {
  //       console.error('Error deleting dispatched', error);
  //     }
  //   );
  // }

  // selectedValue: string = '';
  // options = [
  //   { value: '1', label: 'Option 1' },
  //   { value: '2', label: 'Option 2' },
  //   { value: '3', label: 'Option 3' },
  // ];

  // select2Options = {
  //   width: '100%',
  //   placeholder: 'Select an option',
  //   allowClear: true
  // };


  // selectedValue: string = '';
  // options = [
  //   { value: '1', label: 'Option 1' },
  //   { value: '2', label: 'Option 2' },
  //   { value: '3', label: 'Option 3' },
  // ];

  // select2Options = {
  //   width: '100%',
  //   placeholder: 'Select an option',
  //   allowClear: true
  // };

  select2Options = {
    width: '100%',
    placeholder: 'Select an option',
    allowClear: true
  };

  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '3', label: 'Option 4' },
     { value: '3', label: 'Option 5' },
      { value: '3', label: 'Option 6' },
       { value: '3', label: 'Option 7' },
        { value: '3', label: 'Option 8' },
  ];

}