import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-add-medes',
  templateUrl: './add-medes.component.html',
  styleUrls: ['./add-medes.component.css']
})
export class AddMedesComponent {


  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,

  ) {

    const userIdString = this.service.getlocalstoragevalue('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    const clientIdString = localStorage.getItem('clientid');
    this.clientid = clientIdString ? parseInt(clientIdString, 10) : null;
  }
  userId:any
  clientid: any
  ck: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      allergies: [''],
     
      expiry_date: [''],
      medicine_name: [''],
      medicine_restrictions: [''], 
      mfg_date: [''],
      precautions: ['',],
      side_effect:[''],
      unit:[''],
      // qty: ['', [Validators.required, Validators.min(20)]],
      user_id: [this.userId],
    });

    this.units();
    this.getUser()
    this.getclients()
  }

  usersData:any;
  getUser(){
    this.service.getUsersdata().subscribe((res)=>{
      this.usersData = res
    })
  }

  clients:any;
  getclients(){
    this.service.getclientsdata().subscribe((res)=>{
      this.clients = res
    })
  }


  addmeds() {
    if (this.loginForm.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("Patient data", this.loginForm.value);
     
      this.service.addmedinice(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('Medicine added succesfully')
            this.router.navigate(['/Admin/medication'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  








  cancel() {
    this.router.navigate(['/Admin/medication'])
  }
  url: any;

  onSelectFile(event: any) {
    const file = event.target.files?.[0]; // Safely access the file
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
      console.log("File content as Base64:", this.url);
      this.loginForm.patchValue({ profile: this.url }); // Use patchValue to update form control
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  }



  unitss:any=[]
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
}