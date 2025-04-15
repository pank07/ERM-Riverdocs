
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
@Component({
  selector: 'app-add-mildstone',
  templateUrl: './add-mildstone.component.html',
  styleUrls: ['./add-mildstone.component.css']
})
export class AddMildstoneComponent {

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
 

  allData:any;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user_id:[this.userId],
      room_id: [],
      client_id: [this.clientid],
      title: [],
      description: ['',],
      status: ['',]
    });

    const roomidss = localStorage.getItem('clientRoomId');
    console.log("roomidss",roomidss);
    
 

    // if (roomidss) {
    //   this.allData = JSON.parse(roomidss);
    //   console.log("Retrieved client data:", this.allData);
    // }
  
    this.loginForm.patchValue({ room_id: roomidss });

  }

  addusers() {
    if (this.loginForm.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("Patient data", this.loginForm.value);
      
      this.service.createmilestones(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('Milstone added succesfully')
            this.router.navigate(['/Admin/Clients'])
        
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/Admin/Clientdetails'])
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

}
