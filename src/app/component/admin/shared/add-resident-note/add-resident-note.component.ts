import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-add-resident-note',
  templateUrl: './add-resident-note.component.html',
  styleUrls: ['./add-resident-note.component.css']
})
export class AddResidentNoteComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,

  ) {
    const userIdString = this.service.getlocalstoragevalue('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;

    console.log("this.userId add notes", this.userId);
    
    const clientIdString = localStorage.getItem('clientid');
    this.clientid = clientIdString ? parseInt(clientIdString, 10) : null;
  }
  userId:any
  clientid: any
  ck: boolean = false;
  allData:any;
  ngOnInit(): void {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    console.log('Current Time:', currentTime);
    this.loginForm = this.fb.group({
      user_id:[this.userId],
      description:['',],
      title:['',],
      workspace_id:['',],
      time: [currentTime] 
    });


  }

 


  addusers() {
    if (this.loginForm.invalid) {
      this.ck = true;
      return;
    } else {
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }); // Update with current local time
      this.loginForm.patchValue({ time: currentTime });
      console.log("Patient data", this.loginForm.value);
      
      this.service.notess(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('Notes added succesfully')
            this.router.navigate(['/Admin/Clientdetails'])
        
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



}