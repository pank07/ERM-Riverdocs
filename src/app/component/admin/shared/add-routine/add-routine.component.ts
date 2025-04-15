
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AllService } from 'src/app/Api/all.service';
// import { SweetalertssService } from 'src/app/sweetalertss.service';
// @Component({
//   selector: 'app-add-routine',
//   templateUrl: './add-routine.component.html',
//   styleUrls: ['./add-routine.component.css']
// })
// export class AddRoutineComponent {
//   loginForm!: FormGroup;
//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private service: AllService,
//     private swet: SweetalertssService,

//   ) {

//     const userIdString = localStorage.getItem('userId');
//     this.userId = userIdString ? parseInt(userIdString, 10) : null;
//     const clientIdString = localStorage.getItem('clientid');
//     this.clientid = clientIdString ? parseInt(clientIdString, 10) : null;
//   }
//   timeInputs: number[] = [];

//   userId:any
//   clientid: any
//   ck: boolean = false;
//   ngOnInit(): void {
//    this.units()
//     this.getmedicinesusers()
//     this.loginForm = this.fb.group({
//       user_id:[this.userId],
//       client_id: [this.clientid],
//       medicine_name:[''],
//       rxnumber:[''],
//       frequency:[''],
//       unit:[''],
//       visibility_logs:[''],
//       routine_start_date:[''],
//       routine_end_date:[''],
//       message:[''],
//       routine_time:[''],
//     });
//   }

//   // addroutine() {
//   //   if (this.loginForm.invalid) {
//   //     this.ck = true;
//   //     return;
//   //   } else {
//   //     console.log("Patient data", this.loginForm.value);
      
//   //     this.service.addroutines(this.loginForm.value).subscribe({
//   //       next: (res) => {
//   //         console.log("res", res)
//   //         this.swet.SucessToast('Routines Added succesfully')
//   //         this.router.navigate(['/Admin/Clientdetails'])
//   //       },
//   //       error: (err) => {
//   //         console.log(err);
//   //       }
//   //     });
//   //   }
//   // }

//   onFrequencyChange(): void {
//     const frequency = this.loginForm.get('frequency')?.value;
//     const count = frequency.split('-').filter((value: string) => value === '1').length;

//     this.timeInputs = [];
//     Object.keys(this.loginForm.controls).forEach((key) => {
//       if (key.startsWith('routine_time')) {
//         this.loginForm.removeControl(key);
//       }
//     });

//     for (let i = 0; i < count; i++) {
//       this.timeInputs.push(i);
//       this.loginForm.addControl(`routine_time${i}`, new FormControl('', Validators.required));
//     }
//   }









//   cancel() {
//     this.router.navigate(['/Admin/Clientdetails'])
//   }
//   url: any;

//   onSelectFile(event: any) {
//     const file = event.target.files?.[0]; // Safely access the file
//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     console.log("Selected file:", file);

//     const reader = new FileReader();
//     reader.onload = () => {
//       this.url = reader.result;
//       console.log("File content as Base64:", this.url);
//       this.loginForm.patchValue({ profile: this.url }); // Use patchValue to update form control
//     };
//     reader.onerror = (error) => {
//       console.error("Error reading file:", error);
//     };

//     reader.readAsDataURL(file);
//   }



//   getmedicinesUser:any= []

//   getmedicinesusers(): void {
//     this.service.getmedicines().subscribe({
//       next: (res: any) => {
//         this.getmedicinesUser = res; 
       
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   unitss:any=[]
//   units(): void {
//     this.service.uinitsdata().subscribe({
//       next: (res: any) => {
//         this.unitss = res; 
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }







//   addroutine() {
//     // Combine routine_timeX values into a single string, separated by commas
//     const times = this.timeInputs
//       .map((i) => this.loginForm.get(`routine_time${i}`)?.value)
//       .filter(Boolean) // Filter out empty or invalid values
//       .join(', ');
  
//     // Check if times are valid
//     if (!times) {
//       console.error('Error: Time values are missing');
//       // this.swet.ErrorToast('Please select valid time(s) for the routine');
//       return;
//     }
  
//     // Add the combined times to the form under the key `routine_time`
//     this.loginForm.patchValue({ routine_time: times });
  
//     // Log the form data before cleanup
//     console.log('Form data before cleanup:', this.loginForm.value);
  
//     // Create a clean payload by excluding `routine_timeX` controls
//     const payload = { ...this.loginForm.value };
//     this.timeInputs.forEach((i) => {
//       delete payload[`routine_time${i}`]; // Remove individual routine_timeX fields
//     });
  
//     // Log the cleaned-up payload
//     console.log('Cleaned-up payload:', payload);
  
//     // Submit the form if it's valid
//     if (this.loginForm.valid) {
//       this.service.addroutines(payload).subscribe({
//         next: (res) => {
//           console.log('Response:', res);
//           this.swet.SucessToast('Routines added successfully');
//           this.router.navigate(['/Admin/Clientdetails']);
//         },
//         error: (err) => {
//           console.error('Error:', err);
//         },
//       });
//     } else {
//       this.ck = true; // Highlight invalid form controls
//       console.error('Form is invalid');
//     }
//   }
  
  
  
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css']
})
export class AddRoutineComponent implements OnInit {
  loginForm!: FormGroup;
  timeInputs: number[] = [];
  userId: any;
  clientid: any;
  ck: boolean = false;
  url: any;
  getmedicinesUser: any = [];
  unitss: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService
  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    const clientIdString = localStorage.getItem('clientid');
    this.clientid = clientIdString ? parseInt(clientIdString, 10) : null;
  }

  ngOnInit(): void {
    this.units();
    this.getmedicinesusers();
    this.loginForm = this.fb.group({
      user_id: [this.userId],
      client_id: [this.clientid],
      medicine_name: ['', Validators.required],
      rxnumber: ['', Validators.required],
      frequency: ['', Validators.required],
      unit: ['', Validators.required],
      visibility_logs: ['', Validators.required],
      routine_start_date: ['', Validators.required],
      routine_end_date: ['', Validators.required],
      message: [''],
      routine_time: [''], // Holds the combined time values
    });
  }

  onFrequencyChange(): void {
    const frequency = this.loginForm.get('frequency')?.value;
    const count = frequency.split('-').filter((value: string) => value === '1').length;

    this.timeInputs = [];
    Object.keys(this.loginForm.controls).forEach((key) => {
      if (key.startsWith('routine_time')) {
        this.loginForm.removeControl(key);
      }
    });

    for (let i = 0; i < count; i++) {
      this.timeInputs.push(i);
      this.loginForm.addControl(`routine_time${i}`, new FormControl('', Validators.required));
    }
  }

  addroutine() {
    // Combine routine_timeX values into a single string, separated by commas
    const times = this.timeInputs
      .map((i) => this.loginForm.get(`routine_time${i}`)?.value)
      .filter(Boolean) // Exclude null or undefined values
      .join(', ');
  

      
    console.log('Combined Times:', times); // Debugging step
  
    if (!times) {
      console.error('Error: Time values are missing');
      return;
    }
  
   this.loginForm.patchValue({ routine_time: times });
   const formValue = this.loginForm.value;
              Object.keys(formValue).forEach(key => {
          if (key.startsWith('routine_time')) {
            delete formValue[key];
          }
        });
   
    const formData = {
      ...formValue,
      routine_time: times, // Ensure the time field is added correctly here
    };
  
    console.log('Final Payload with routine_time:', formData); // Debugging step
  
    if (this.loginForm.valid) {
      this.service.addroutines(formData).subscribe({
        next: (res) => {
          console.log('Response:', res);
          this.swet.SucessToast('Routines added successfully');
          this.router.navigate(['/Admin/Clients']);
        },
        error: (err) => {
          console.error('Backend Error:', err);
         
        },
      });
    } else {
      console.error('Form is invalid');
     
    }
  }  

  cancel() {
    this.router.navigate(['/Admin/Clients']);
  }

  onSelectFile(event: any) {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
      this.loginForm.patchValue({ profile: this.url });
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
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

