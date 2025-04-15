
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../Api/all.service';
import { SweetalertssService } from '../sweetalertss.service';
import { HelperservicessService } from '../helperservicess.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    goto() {
        this.router.navigate(['home'])
    }

    ck: boolean = false;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: AllService,
        private swet: SweetalertssService,
        private helper: HelperservicessService,
    ) { }
    ngOnInit(): void {

        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.getLogo()

    }

    logoGet: any[] = [];
    selectedLogo: string = '';
    defaultLogo: string = 'https://media.istockphoto.com/id/863958328/vector/stethoscope-icon.jpg?s=612x612&w=0&k=20&c=to7jGDQ9xktMUmA1CjHs5Dg_9Xg9fwhG2M5jOR-NtXk=';
    getLogo() {
        this.service.getLogo().subscribe((res: any) => {
            this.logoGet = res
            const item = this.logoGet.find((data: any) => data.id === 1);
            // Assign the logo only if it exists
            this.selectedLogo = item && item.logo ? item.logo : this.defaultLogo;
        })
    }


    apiErrorMessage: string | null = null; // Declare the apiErrorMessage property

    login() {
        if (this.loginForm.invalid) {
            this.ck = true;
            return;
        }
        // else {
        console.log("Patient data", this.loginForm.value);
        this.service.superAdminLogin(this.loginForm.value).subscribe({
            next:  (res) => {
                console.log("res", res)
                if (res.success) {
                    this.helper.getDataGroup();
                    this.helper.updatedata = res.response.group_id;
                  

                    // Store successful login data in localStorage
                    // localStorage.setItem('userId', res.response.userId);
                    // localStorage.setItem('group_id', res.response.group_id);
                    // localStorage.setItem('group_name', res.response.group_name);
                    // localStorage.setItem('first_name', res.response.first_name);
                      this.service.setlocalstoragevalue('group_id', String(res.response.group_id)); 
                    
                    
                    this.service.setlocalstoragevalue('first_name', res.response.first_name);
                    this.service.setlocalstoragevalue('last_name', res.response.last_name);
                  this.service.setlocalstoragevalue('group_name', res.response.group_name); 
             
                    this.service.setlocalstoragevalue('userId',  String(res.response.userId));
                     this.service.setlocalstoragevalue('user_token',   res.response.token); 
                     this.service.setlocalstoragevalue('username', res.response.username);
                    // console.log("kch bhii likh diya", this.service.getlocalstoragevalue('first_name'));

                    // localStorage.setItem('last_name', res.response.last_name);
                    // localStorage.setItem('user_token', res.response.token);
                    // localStorage.setItem('username', res.response.username);
                    localStorage.setItem('workspace_id', `1`);
                    // console.log("group_id login set",res.response.group_id);
                    // console.log("group_name login set",res.response.group_name);
                    this.swet.SucessToast(`${res.response.first_name} ${res.response.last_name} ${res.message}`);
                    
                    this.router.navigate(['/Admin'])
                    // window.location.reload()
                    this.helper.gautam = res.response.group_id;
                    this.helper.grouPID = res.response.group_id;
                    this.helper.idUSer = res.response.userId;
                    console.log("Admin res.response.group_id", this.helper.gautam);
                  

                }
            },
            error: (err) => {
                console.log(err);
                // Handle server or network errors
                this.apiErrorMessage = err.error?.message || 'Something went wrong, please try again.';
                this.ck = true; // Show the error state
            }
        });
        // }
    }
    // handleRoleBasedRedirection(res: any) {
    //     if (res.role === 'superadmin') {
    //         localStorage.setItem('Superadmin_token', res.token);
    //         localStorage.setItem('superadmin_name', res.name);
    //         this.router.navigate(["/superAdmin/home"]);
    //     } else if (res.role === 'doctor') {
    //         localStorage.setItem('homecare_token', res.token);
    //         localStorage.setItem('id', res.id);
    //         localStorage.setItem('homecare_name', res.name);
    //         this.router.navigate(["/Admin/admin_home"]);
    //     } else if (res.role === 'nurse') {
    //         localStorage.setItem('nurse_token', res.token);
    //         localStorage.setItem('id', res.id);
    //         localStorage.setItem('nurse_name', res.name);
    //         localStorage.setItem('doctorId', res.doctorId);
    //         this.router.navigate(["/nurse/nurse_home"]);
    //     } else if (res.role === 'patient') {
    //         localStorage.setItem('patient_token', res.token);
    //         localStorage.setItem('patient_name', res.firstname);
    //         this.router.navigate(["/patient/patient_home"]);
    //     }
    // }

    // onChanges(data: string) {
    //     if (data === 'superadmin') {
    //         this.loginForm.controls['email'].setValue('superadmin@gmail.com');
    //         this.loginForm.controls['password'].setValue('superadmin');
    //     } else if (data === 'doctor') {
    //         this.loginForm.controls['email'].setValue('mayank@gmail.com');
    //         this.loginForm.controls['password'].setValue('mayank@123');
    //     }
    //     else if (data === 'nurse') {
    //         // this.form.controls['mobileNumber'].setValue('+919644605330');
    //         this.loginForm.controls['email'].setValue('nurse@gmail.com');
    //         this.loginForm.controls['password'].setValue('nurse');
    //     }
    //     else if (data === 'patient') {
    //         // this.form.controls['mobileNumber'].setValue('+919644605330');
    //         this.loginForm.controls['email'].setValue('patient@gmail.com');
    //         this.loginForm.controls['password'].setValue('patient');
    //     }
    // }


    onChangess() {
        this.loginForm.controls['email'].setValue('gautam1@gmail.com');
        this.loginForm.controls['password'].setValue('123');
    }

    showPassword: boolean = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onForgotPasswordClick(event: Event): void {
        event.preventDefault();
        this.swet.SucessToast('Forgot password request sent to admin.');
    }

}
