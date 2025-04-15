

import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facesheetpages',
  templateUrl: './facesheetpages.component.html',
  styleUrls: ['./facesheetpages.component.css']
})
export class FacesheetpagesComponent implements OnInit {
  active_status: any;
  residentName: any;
  startDate: any;
  isExpired(dueDate: string): boolean {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today; 
  }
  BasicInformation!:FormGroup
  FacilityInformation!:FormGroup
  MedicalServices!:FormGroup
  addinsuranceposts!:FormGroup
  addAllergies!:FormGroup
  addmedicalhistory!:FormGroup
  addDiagnoses!:FormGroup
  ck: boolean = false;
  clientid: string | null = null;;
  isEditMode: boolean = false; 
  addCommentForm!: FormGroup;
  editTaskForm!: FormGroup;
  dataById: any;
  tempData: any;
  userByIdDatasss: any = [];
  userId: any
  clientRoomNo: any
  faceSheetForm!: FormGroup;
  addfamilyandfrineds!:FormGroup
  loginForm!: FormGroup;
  selectedUsers: any[] = [];
  selectedMedicineIds: any[] = [];
  allData: any[] = []
  clientDataid: any;
  addnotesloginForm!:FormGroup
  addvisiblitynotes!:FormGroup
  clientdetailss:any;
  roomNo:any

  constructor(
    private service :AllService,
    private sweet: SweetalertssService,
    private fb: FormBuilder,
    private swet:SweetalertssService,
    private router:Router,
    private activated:ActivatedRoute
  ) { 
    
    this.userId= this.service.getlocalstoragevalue('userId');
    this.userId =parseInt(this.userId);
    console.log(" this.userId", typeof this.userId);
    this.roomidnoss = localStorage.getItem('clientRoomno');
    console.log("roomidss facesheet",this.roomidnoss);

    this.editTaskForm = this.fb.group({
      id: [''],
      name: [''],
      // milestone_id: [''],
      description: [''],
      priority: [''],
      start_date: [''],
      due_date: [''],
      // time: [''],
      task_message:[''],
    });

    // this.roomNo = this.service.rommnoser;
    // console.log('roomNo service facesheet', this.roomNo);
//      const clientdetailss = localStorage.getItem('clientdetails');
// const roomidss = localStorage.getItem('clientRoomno'); 
// const clientDetails = JSON.parse(roomidss);
// const roomNumber = roomidss?.room_number 
// console.log("clientdetailss :", clientdetailss);
// console.log("clientdetailss :", roomidss);
// const roomIdString = localStorage.getItem('clientRoomno');
//     this.clientRoomNo = roomIdString ? parseInt(roomIdString, 10) : null;
//     console.log( 'client romm no in facesheet' ,this.clientRoomNo);
  }


  currentDateTime: Date = new Date();

  
  roomidnoss:any;

  
  ngOnInit(): void {
  

      this.currentDateTime = new Date();

    this.clientid = this.service.clientidface;
    console.log('clientid facesheet', this.clientid);
    this.BasicInformation = this.fb.group({
      first_name:[this.first_name],
      last_name:[this.last_name],
      middle_name:[],
      gender:[],
      dateofBirth:[],
      ssn:[],
      religion:[],
      primary_language:[],
      resident_phone:[],
      eye_color:[],
      height_unit:['imperail'],
      feet:[],
      inches:[],
      biography:[],
      client_id:[this.clientid], 
    });
    this.FacilityInformation = this.fb.group({
      status:[],
      facility_name:[],
      admission_date:[],
      room:[],
      client_id:[this.clientid],
    });
    this.MedicalServices = this.fb.group({
      dnr:[],
      on_hospice:[],
      hospice_agency:[],
      preferred_hospital:[],
      preferred_pharmacy:[],
      on_home_health:[],
      home_health_agency:[],
      mortuary:[],
      mortuary_phone:[],
      client_id:[this.clientid],
    });
    this.addinsuranceposts = this.fb.group({
      id: [''],
      insurance_name: [],
      member_id: [this.clientid],
      contact_no: [],
      group_name: [],
      client_id:[this.clientid],
    });
    this.addDiagnoses=this.fb.group({
      id: [''],
      name: [],
      level_name: [],
      note:[], 
      client_id:[this.clientid],
    });
    this.addAllergies=this.fb.group({
        id: [''],
        name: [],
        type: [],
        level_name: [],
        note: [],
        client_id:[this.clientid],
    });
    this.addAllergies=this.fb.group({
      id: [''],
      name: [],
      type: [],
      level_name: [],
      note: [],
      client_id:[this.clientid],
  });

  this.addmedicalhistory=this.fb.group({
    id: [''],
        name: [],
        category: [],
        note: [],
        client_id:[this.clientid],
});
this.addfamilyandfrineds=this.fb.group({
      id: [''],
      relationship: [],
      first_name: [],
      last_name:[],
      email:[],
      contact_name: [],
      phone_no: [],
      address_first: [],
      address_sec: [],
      city:[],
      state: [],
      zip: [],
      country: [],
      additional_info: [],
      client_id:[this.clientid],
});
    if (this.clientid) {
      this.fetchFacesheetById();
    }
   
    if (this.clientid) {
      this.getbyidssfacesheet_facility_info_details();
    }     
  
    if (this.clientid) {
      this.facesheet_medical_service_detailss();
    }

    if(this.clientid){
      this.getbyidfacesheet_insurance();
    }

    if(this.clientid){
      this.getbyidfacesheet_diagnosess();
    }

    if(this.clientid){
      this.getbyidfacesheet_allergiesss();
    }
    if(this.clientid){
      this.getbyidmedical_historyssss()
    }

    if(this.clientid){
      this.getbyidfamily_friendssssssss()
    }

    this.finalfacesheetss()
    this.clientDataid = this.activated.snapshot.paramMap.get('clientid');
    this.ByIds(this.clientDataid);
    this.getuserstaskdatas();
    this.getTasksOFUsers()
    this.getmedicinesusers()
    this.getssmilestone()
    this.getnotess()
    this.getmedicipnr()
    this.units();
    this.getReportMar();
    this.getproffesionalsss();

    
this.generateMonthDates(this.currentMonth, this.currentYear);
    // const clientData = this.service.getclientData();
    // this.allData = clientData
    // this.clientDataid = clientData[0].id
    // console.log("Received client data:", clientData);
    // console.log("Received client id:", this.clientDataid);

    this.loginForm = this.fb.group({
      status: [''],
      message: [' '],
      client_id: [''],
      user_id: [''],
      routine_id: [''],
      routine_status: [],
      routine_time: [],
    });
    this.addCommentForm = this.fb.group({
      client_id: [null],
      user_id: [this.userId],
      routine_id: [null],
      routine_time: [null],
      comment: [''],
      pnr_medicine_id:[]
    });

    this.ByIdgetbytaskid()
    this.loadAllComments();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    console.log('Current Time:', currentTime);
    this.addnotesloginForm = this.fb.group({
      user_id:[this.userId],
      description:['',],
      title:['',],
      workspace_id:['',],
      time: [currentTime] 
    });
    this.addvisiblitynotes = this.fb.group({
      user_id:[this.userId],
      room_id: [this.roomidnoss],
      client_id: [this.clientid],
      title: [],
      description: ['',],
      status: ['',]
    });
    this.loginForm = this.fb.group({
      client_id: [this.clientid],
      description: [''],
      due_date: ['', Validators.required],
      milestone_id: [''],
      name: [''],
      priority: [''],
      project_id: [this.roomidnoss],
      start_date: ['', [Validators.required, this.noPastDateValidator]],
      status: [2],
      task_message: [''],
      user_id: [this.userId],
      medicine_id: new FormControl([]),
      comment_count: [''],
      frequency: [''],
      unit: [''],
      time: [''],
      qty:[''],
      medical_professional_id:[''],
      task_type:[''],
    });

    // this.lol12()
    // this.addvisiblitynotes.patchValue({ room_id: this.roomidnoss });
    // console.log(" this.roomidnoss", this.roomidnoss);
    // const roomidss = localStorage.getItem('clientRoomId');
    // this.loginForm.patchValue({ project_id: roomidss });
    this.loginForm.get('start_date')?.valueChanges.subscribe((startDate) => {
      this.updateDueDateValidator(startDate);
    });
  }
  noPastDateValidator(control: any) {
    const currentDate = new Date().toISOString().split('T')[0]; 
    if (control.value && control.value < currentDate) {
      return { noPastDate: true };
    }
    return null; 
  }
  updateDueDateValidator(startDate: string) {
    const dueDateControl = this.loginForm.get('due_date');
    if (dueDateControl) {
      dueDateControl.setValidators([ 
        Validators.required,
        (control) => {
          if (control.value && control.value < startDate) {
            return { dueDateInvalid: true }; 
          }
          return null;
        }
      ]);
      dueDateControl.updateValueAndValidity();
    }
  }
  lol12(){
  }
  roomidssaaa:any
  userByIdDatas:any=[];
  fetchFacesheetById(): void {
    this.service.getbyidfacesheet_basicinfos(this.clientid).subscribe({
      next: (res: any) => {
        this.userByIdDatas = res.data;
        // console.log('Fetched Facesheet Data:', this.userByIdDatas);
        this.BasicInformation.patchValue({
          first_name: this.userByIdDatas[0].first_name || '',
          middle_name: this.userByIdDatas[0].middle_name || '',
          last_name: this.userByIdDatas[0].last_name || '',
          gender: this.userByIdDatas[0].gender || '',
          dateofBirth: this.userByIdDatas[0].dateofBirth || '',
          ssn: this.userByIdDatas[0].ssn || '',
          religion: this.userByIdDatas[0].religion || '',
          primary_language: this.userByIdDatas[0].primary_language || '',
          resident_phone: this.userByIdDatas[0].resident_phone || '',
          eye_color: this.userByIdDatas[0].eye_color || '',
          height_unit: this.userByIdDatas[0].height_unit || '',
          biography: this.userByIdDatas[0].biography || '',
          inches: this.userByIdDatas[0].inches || '',
          feet: this.userByIdDatas[0].feet || '',
        });
      },
      error: (err: any) => {
        console.error('Error fetching facesheet data:', err);
      }
    });
  }
  finalfacesheetsssss:any=[]
  finalfacesheetss(): void {
    this.service.finalfacesheetss(this.clientid).subscribe({
      next: (res: any) => {
        this.finalfacesheetsssss = res;
        console.log("this.finalfacesheetsssss",this.finalfacesheetsssss);

      },
      error: (err: any) => {
        console.error('Error fetching facesheet data:', err);
      }
    });
  }
  
  facesheet_facility:any=[]
  getbyidssfacesheet_facility_info_details(): void {
    this.service.facesheet_facility_info_details(this.clientid).subscribe({
      next: (res: any) => {
        this.facesheet_facility = res.data;
        // console.log('Fetched facesheet_facility Data:', this.facesheet_facility);
        this.FacilityInformation.patchValue({
          status: this.facesheet_facility[0].status || '',
          facility_name: this.facesheet_facility[0].facility_name || '',
          admission_date: this.facesheet_facility[0].admission_date || '',
          room: this.facesheet_facility[0].room || '',
        });
      },
      error: (err: any) => {
        console.error('Error fetching facesheet data:', err);
      }
    });
  }

  medical_service:any=[]
  facesheet_medical_service_detailss(): void {
    this.service.facesheet_medical_service_details(this.clientid).subscribe({
      next: (res: any) => {
        this.medical_service = res.data;
        // console.log('Fetched medical_service Data:', this.medical_service);
        this.MedicalServices.patchValue({
          dnr:this.medical_service[0].dnr || '',
          on_hospice:this.medical_service[0].on_hospice || '',
          hospice_agency:this.medical_service[0].hospice_agency || '',
          preferred_hospital:this.medical_service[0].preferred_hospital || '',
          preferred_pharmacy:this.medical_service[0].preferred_pharmacy || '',
          on_home_health:this.medical_service[0].on_home_health || '',
          home_health_agency:this.medical_service[0].home_health_agency || '',
          mortuary:this.medical_service[0].mortuary || '',
          mortuary_phone:this.medical_service[0].mortuary_phone || '',
        });
      },
      error: (err: any) => {
        console.error('Error fetching facesheet data:', err);
      }
    });
  }

  insuranceposts:any=[]
getbyidfacesheet_insurance(){
  this.service.getbyidfacesheet_insurance(this.clientid).subscribe({
    next:(res:any)=>{
      this.insuranceposts = res.data;
        // console.log('Fetched medical_service Data:', this.medical_service);
        this.addinsuranceposts.patchValue({
          insurance_name:this.insuranceposts[0].insurance_name || '',
          member_id:this.insuranceposts[0].member_id || '',
          contact_no:this.insuranceposts[0].contact_no || '',
          group_name:this.insuranceposts[0].group_name || '', 
          id:this.insuranceposts[0].id || '',
        });
    },
    error:(err:any) =>{
      console.error('Error fetching facesheet data:', err);
      
    }
});
}


diagnosess:any=[]
getbyidfacesheet_diagnosess(){
  this.service.getbyidfacesheet_diagnoses(this.clientid).subscribe({
    next:(res:any)=>{
      this.diagnosess = res.data;
        // console.log('Fetched medical_service Data:', this.medical_service);
        // this.addDiagnoses.patchValue({
        //   name: this.diagnosess[0].name|| '',
        //   level_name:this.diagnosess[0].level_name|| '',
        //   note: this.diagnosess[0].note || '',
        //   id:this.diagnosess[0].id || '',
        // });
    },
    error:(err:any) =>{
      console.error('Error fetching facesheet data:', err);
      }
});
}
dignosisupdded:any
getdiagnosess(a:any){
  console.log("getdiagnosess",a);
 this.dignosisupdded = a
 this.addDiagnoses.patchValue({
          name: this.dignosisupdded.name|| '',
          level_name:this.dignosisupdded.level_name|| '',
          note: this.dignosisupdded.note || '',
          id:this.dignosisupdded.id || '',
        });

}
allergiessss:any=[]
getbyidfacesheet_allergiesss(){
  this.service.getbyidfacesheet_allergiess(this.clientid).subscribe({
    next:(res:any)=>{
      this.allergiessss = res.data;
        // console.log('Fetched medical_service Data:', this.medical_service);
        // this.addAllergies.patchValue({
        //   name: this.allergiessss[0].name|| '',
        //   level_name:this.allergiessss[0].level_name|| '',
        //   note: this.allergiessss[0].note || '',
        //   id:this.allergiessss[0].id || '',
        //   type:this.allergiessss[0].type || '',
        // });
    },
    error:(err:any) =>{
      console.error('Error fetching facesheet data:', err);
      }
});
}
allergiesup:any
getallergiesup(a:any){
  console.log("getdiagnosess",a);
 this.allergiesup = a
 this.addAllergies.patchValue({
          name: this.allergiesup.name|| '',
          level_name:this.allergiesup.level_name|| '',
          note: this.allergiesup.note || '',
          id:this.allergiesup.id || '',
          type:this.allergiesup.type || '',
        });

}

medical_historyss:any=[]
getbyidmedical_historyssss(){
  this.service.getbyidmedical_historyss(this.clientid).subscribe({
    next:(res:any)=>{
      this.medical_historyss = res;
      console.log("this.medical_historyss",this.medical_historyss);
      
        // console.log('Fetched medical_service Data:', this.medical_service);
        // this.addmedicalhistory.patchValue({
        //   name: this.medical_historyss[0].name|| '',
        //   category:this.medical_historyss[0].category|| '',
        //   note: this.medical_historyss[0].note || '',
        //   id:this.medical_historyss[0].id || '',
        // });
    },
    error:(err:any) =>{
      console.error('Error fetching facesheet data:', err);
      }
});
}

historyup:any;
getbyidmedicalhistoryup(a:any){
  console.log("getdiagnosess",a);
 this.historyup = a
  console.log('Fetched medical_service Data:', this.historyup);
        this.addmedicalhistory.patchValue({
          name: this.historyup.name|| '',
          category:this.historyup.category|| '',
          note: this.historyup.note || '',
          id:this.historyup.id || '',
        });

}
  addBasicInformation(): void {
    if (this.BasicInformation.valid) {
      // console.log('Form Submitted:', this.BasicInformation.value);
      this.service.postfacesheetinfo(this.BasicInformation.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`Facesheet Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  addFacilityInformation() {
    if (this.FacilityInformation.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("FacilityInformation data", this.FacilityInformation.value);
      
      this.service.poostfacesheetfacilityinfo(this.FacilityInformation.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`Facesheet Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  
  addMedicalServices() {
    if (this.MedicalServices.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("MedicalServices data", this.MedicalServices.value);
      
      this.service.postfacesheetmedicalservices(this.MedicalServices.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`Facesheet Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  addinsurancepost(){
    if (this.addinsuranceposts.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("addinsuranceposts data", this.addinsuranceposts.value);
      
      this.service.insurancepost(this.addinsuranceposts.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`Facesheet Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  addsaddDiagnoses(){
    if (this.addDiagnoses.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("addDiagnoses data", this.addDiagnoses.value);
      
      this.service.postfacesheet_diagnoses(this.addDiagnoses.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`addDiagnoses Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  addAllergiess(){
    if (this.addAllergies.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("addAllergies data", this.addAllergies.value);
      
      this.service.postfacesheet_allergiess(this.addAllergies.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`addAllergies Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  addmedicalhistoryss(){
    if (this.addmedicalhistory.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("addmedicalhistory data", this.addmedicalhistory.value);
      
      this.service.addmedicalhistoryssss(this.addmedicalhistory.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`addmedicalhistory Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  addfamilyandfrinedspost(){
    if (this.addfamilyandfrineds.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("addfamilyandfrineds data", this.addfamilyandfrineds.value);
      // return
      
      this.service.addfamilyandfrinedsssss(this.addfamilyandfrineds.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast(`addfamilyandfrineds Info Added succesfully`)
          // this.router.navigate(['/Admin/unit'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  familyandfrindsa:any=[]
  getbyidfamily_friendssssssss(){
  this.service.getbyidfamily_friendsss(this.clientid).subscribe({
    next:(res:any)=>{
      this.familyandfrindsa = res.data;
      console.log("this.medical_historyss",this.medical_historyss);
      
        // console.log('Fetched medical_service Data:', this.medical_service);
        // this.addmedicalhistory.patchValue({
        //   name: this.medical_historyss[0].name|| '',
        //   category:this.medical_historyss[0].category|| '',
        //   note: this.medical_historyss[0].note || '',
        //   id:this.medical_historyss[0].id || '',
        // });
    },
    error:(err:any) =>{
      console.error('Error fetching facesheet data:', err);
      }
});
}

familyandfrinds:any;
getbyifamilyandfrindsup(a:any){
  console.log("getdiagnosess",a);
 this.familyandfrinds = a
  console.log('Fetched medical_service Data:', this.medical_service);
        this.addfamilyandfrineds.patchValue({
          relationship:  this.familyandfrinds.relationship || '',
          first_name:  this.familyandfrinds.first_name || '',
          last_name: this.familyandfrinds.last_name || '',
          email: this.familyandfrinds.email || '',
          contact_name: this.familyandfrinds.contact_name || '',
          phone_no:  this.familyandfrinds.phone_no || '',
          address_first:  this.familyandfrinds.address_first || '',
          address_sec:  this.familyandfrinds.address_sec || '',
          city: this.familyandfrinds.city || '',
          state:  this.familyandfrinds.state || '',
          zip:  this.familyandfrinds.zip || '',
          country:  this.familyandfrinds.country || '',
          additional_info:  this.familyandfrinds.additional_info || '',
          id:this.familyandfrinds.id || '',
        });

}


first_name:any
last_name:any
phone:any
profile:any
  ByIds(id:any) {
    this.service.getuserById(this.clientid).subscribe((res: any) => {
      console.log("user id getuserById", res)
      this.allData = res
      this.first_name= res[0].first_name
      this.last_name = res[0].last_name
      this.phone = res[0].phone
      this.profile = res[0].profile
      // console.log( this.first_name, this.last_name , this.phone , this.profile);
      this.clientDataid = res[0].id
      console.log("Received client data:", res);
      console.log("Received client id:", this.clientDataid);
    })
  }

  getusertaskdataData: any = []
  routinelength: any
  getuserstaskdatas(): void {
    this.service.getroutines().subscribe({
      next: (res: any) => {
        this.getusertaskdataData = res;
        console.log("getusertaskdataData", this.getusertaskdataData);
        
        this.routinelength = res.length;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  medicationtask:any[] = [];
  caretask:any[]=[];
  tasklength: any;
  getTasksOFUserss: any = []
  getTasksOFUsers(): void {
    this.service.getTasksOFRoom().subscribe({
      next: (res: any) => {
        this.getTasksOFUserss = res;
        console.log("getTasksOFUsers", this.getTasksOFUserss)

        this.getTasksOFUserss.forEach((element: any) => {

          if (element.status == 1) {
            element.status = 'Missing'
          }
          else if (element.status == 2) {
            element.status = 'To Do'
          }
          else if (element.status == 3) {
            element.status = 'Done'
          }
          else if (element.status == 4) {
            element.status = 'Canceled'
          }
          else {
            element.status = 'Hold'
          }

            if (element.task_type === 'medication task') {
              this.medicationtask.push(element);
            } else if (element.task_type === 'care task') {
              this.caretask.push(element);
            }
       
    
          console.log("Medication tasks:", this.medicationtask);
          console.log("Care tasks:", this.caretask);

          
        });
        this.tasklength = res.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getmedicinesUser: any = []
  medeslength: any;
  getmedicinesusers(): void {
    this.service.getmedicines().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res;
        this.medeslength = res.length;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getmedicipnrnrrr: any = []
  medeslengthss:any;
  getmedicipnr(): void {
    this.service.getprnmedicine().subscribe({
      next: (res: any) => {
        this.getmedicipnrnrrr = res;
        this.medeslengthss = res.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onclick() {
    this.router.navigate(['/Admin/addusers'])
  }

  mildstonelength: any
  getmildstonedata: any = [];
  getssmilestone(): void {
    this.service.gertmilestoness().subscribe({
      next: (res: any) => {
        this.getmildstonedata = res;
        this.mildstonelength = res.length;


      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getnotessdatalength: any
  getnotessdata: any = [];
  getnotessdatass:any=[];
  getnotess(): void {
    this.service.getnotes().subscribe({
      next: (res: any) => {
        this.getnotessdata = res;
        this.getnotessdatalength = res.length;
        // this.getnotessdatass = [res[res.length - 1]]
        this.getnotessdatass = res.length > 0 ? [res[res.length - 1]] : [];


      },
      error: (err) => {
        console.log(err);
        this.getnotessdatass = [];
      },
    });
  }

  openRoutineTab() {
    const tabButton = document.getElementById('nav-home-tab');
    if (tabButton) {
      tabButton.click();
    }
  }

  dailyclientidbydailyroutine:any;
  dailyroutinesidss :any;
  dailyroutinetime :any;
  dataSend: any
  statusUpdate(task: any, checkbox: any) {
    if (!task) {
      console.error("Invalid task object.");
      return;
    }
    if (task.status == 3 ) {
      checkbox.checked = true;
      return; 
    }
    if( task.status == 4){
      checkbox.checked = false;
      return; 
    }
  
    this.loginForm.setValue({
      status: 'Updated',
      message: `Status update of client ${task.clientname} and update routine id ${task.id} at ${task.time} current time`,
      client_id: task.client_id,
      user_id: this.userId, 
      routine_id: task.id,
      routine_status: 3, // Pass as an array
      routine_time: task.time,
    });
  
    // console.log("Updated Form Data:", this.loginForm.value);
  
    // Trigger the API call
    this.statusUpdatePostMessage();
  }
  
  statusUpdatePostMessage() {
    if (this.loginForm.invalid) {
      console.error("Form is invalid. Please check the fields.");
      return;
    }
  
    this.service.routineactivityss(this.loginForm.value).subscribe({
      next: (res) => {
        // console.log("API Response:", res);
        
        if(res.status==200){
          this.updateMedicineInventory(this.userByIdDatasssmedicine_id);
        }
        this.swet.SucessToast('Routine Activity added successfully');
        this.router.navigate(['/Admin/Clientdetails']);
      },
      error: (err) => {
        console.error("API Error:", err);
      },
    });
  }

  updateMedicineInventory(medicine_id: any) {
    const data = {
      user_ids: this.userId,
      client_ids: this.clientDataid,
    };
    this.service.medicineinventoryadds(medicine_id, data).subscribe({
      next: (res: any) => {
        console.log("Medicine inventory updated successfully:", res);
        this.swet.SucessToast('Medicine inventory updated successfully');
        this.router.navigate(['/Admin/medication']);
      },
      error: (err) => {
        console.error("Error updating medicine inventory:", err);
      },
    });
  }

  statusUpdatefordrop(event: Event, task: any) {
    if (!task) {
      console.error("Invalid task object.");
      return;
    }
  

    if (task.status == 4 || task.status == 3 ) {
      console.log("after check data sttsus 4 ")
      // this.checkbox.nativeElement.checked =true;
      return; 
      
    }

    const selectedValue = (event.target as HTMLSelectElement).value;
    // console.log("Selected Value:", selectedValue);
  
    // Example condition check
    if (selectedValue === "4") {
      this.loginForm.setValue({
        status: 'Cancelled',
        message: `Status Cancelled of client ${task.clientname} and Cancelled routine id ${task.id} at ${task.time} current time`,
        client_id: task.client_id,
        user_id: this.userId, 
        routine_id: task.id,
        routine_status: 4, // Pass as an array
        routine_time: task.time,
      });
  // 
      // console.log("Updated Form Data:", this.loginForm.value);
  
      // Trigger the API call
      this.statusUpdatePostMessagefordrop();
    }
  }
  
  statusUpdatePostMessagefordrop() {
    if (this.loginForm.invalid) {
      console.error("Form is invalid. Please check the fields.");
      return;
    }
  
    this.service.routineactivityss(this.loginForm.value).subscribe({
      next: (res) => {
        // console.log("API Response:", res);
        this.swet.SucessToast('Routine Activity added successfully');
        this.router.navigate(['/Admin/Clientdetails']);
      },
      error: (err) => {
        console.error("API Error:", err);
      },
    });
  }

  allComments: any;
  custom_status:any ='';
  taskComments: { [taskId: string]: any[] } = {};
  taskCommentsCount: { [taskId: number]: number } = {};
  selectedTask: any;
  userByIdDatasssmedicine_id:any
  ByIdgetbytaskid(): void {
    this.service.dailytasks(this.clientid).subscribe((res: any[]) => {
      this.userByIdDatasss = res;
      this.userByIdDatasssmedicine_id = res[0].medicine_id;
      console.log("daily medicine_id", this.userByIdDatasssmedicine_id);
  this.userByIdDatasss.array?.forEach((element:any )=> {
    if(element.status ==1) {
      this.custom_status ='Miss'
    }
    if(element.status ==2) {
     this.custom_status ='To Do'
    }
    if(element.status ==3) {
  this.custom_status ='Done'
    }
    if(element.status ==4) {
      this.custom_status ='Cancelled'
    }
  });
      if (this.userByIdDatasss.length > 0) {
        const firstTask = this.userByIdDatasss[0];
        console.log('First task routine_time:', firstTask.routine_time); // Debugging log
        this.addCommentForm.patchValue({
          client_id: firstTask.client_id,
          routine_id: firstTask.id,
          routine_time: firstTask.time,
          task_id: firstTask.taskidsss,
          comment: '',
        });
      }
    });
  }
  
  onTaskSelect(taskId: number): void {
    const selectedTask = this.userByIdDatasss.find((task: any) => task.id === taskId);
    if (selectedTask) {
      this.addCommentForm.patchValue({
        client_id: selectedTask.client_id,
        routine_id: selectedTask.id,
        routine_time: selectedTask.time,
        task_id: selectedTask.task.id,
      });
    }
  }

  loadAllComments(): void {
  }

  setCommentFormData(task: any): void {
    // console.log('Task object:', task); // Debugging log
    this.selectedTask = task;
    this.loadCommentsForTask(task.id, task.time);
    this.addCommentForm.patchValue({
      client_id: task.client_id,
      user_id: task.user_id,
      routine_id: task.id,
      routine_time: task.time,
      comment: '',
    });
  }

  loadCommentsForTask(taskId: number, routineTime: string): void {
    console.log('Loading comments for:', { taskId, routineTime }); // Debugging log
    this.service.getCommentsByRoutineIdAndTime(taskId, routineTime).subscribe(
      (res: any[]) => {
        console.log('Comments fetched:', res); // Debugging log
        this.taskComments[taskId] = res;
        this.taskCommentsCount[taskId] = res.length;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  onSubmitComment(): void {
    if (this.addCommentForm.valid) {
      const formData = this.addCommentForm.value;
      this.service.clientcommentss(formData).subscribe(
        () => {
          this.swet.SucessToast('Comment added successfully');
          this.loadCommentsForTask(this.selectedTask.id, this.selectedTask.routine_time);
        },
        (error) => {
          console.error('Error posting comment:', error);
        }
      );
    } else {
      console.error('Form is invalid!');
    }
  }

  showMedicineInput = false;
  newMedicine = '';
  medicines: string[] = [];
  selectedMedicine: string | null = null;
  toggleMedicineInput() {
    this.showMedicineInput = !this.showMedicineInput;
  }

  toggleSelection(user: any): void {
    const index = this.selectedUsers.indexOf(user);

    if (index === -1) {
      // Add medicine to the selection
      this.selectedUsers.push(user);
      this.selectedMedicineIds.push(user.id); // Assuming 'id' is the unique identifier
    } else {
      // Remove medicine from the selection
      this.selectedUsers.splice(index, 1);
      this.selectedMedicineIds.splice(index, 1);
    }

    // Update form with selected medicines
    this.addCommentForm.patchValue({
      pnr_medicine_id: this.selectedMedicineIds,
    });
  }

  isUserSelected(user: any): boolean {
    return this.selectedUsers.includes(user);
  }

  byId(id: any): void {
    if (!id) {
      console.error('Error: ID is undefined in byId');
      return;
    }
    this.service.task_by_id(id).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        const taskData = res[0]; 
        if (!taskData) {
          console.error('No task data found in the response');
          return;
        }
        this.editTaskForm.patchValue({
          id: taskData.id,
          name: taskData.name,
          description: taskData.description,
          priority: taskData.priority,
          start_date: taskData.start_date,
          due_date: taskData.due_date,
          task_message: taskData.task_message,
        });
  
        console.log('Form values after patchValue:', this.editTaskForm.value);
      },
      (err: any) => {
        console.error('Error fetching data:', err);
      }
    );
  }
  
  GoToResident(){
    this.router.navigate(['/Admin/Clients'])
  }
  saveChanges(): void {
    const updatedData = this.editTaskForm.value;
    const id = updatedData.id;
  
    console.log('saveChanges called with ID:', id,updatedData);
    // if (!this.tempData) {
    //   console.error('Error: ID is undefined in saveChanges');
    //   return;
    // }
   
    this.service.editClientTask(id, updatedData).subscribe(
      (res: any) => {
        console.log('Successfully updated client task:', res);
        // this.service.clickwindowlocation();
        this.GoToResident();
      },
      (err: any) => {
        console.error('Error during update:', err);
      }
    );
  }

  addnotess() {
    if (this.addnotesloginForm.invalid) {
      this.ck = true;
      return;
    } else {
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }); // Update with current local time
      this.addnotesloginForm.patchValue({ time: currentTime });
      console.log("add notes data", this.addnotesloginForm.value);
      
      this.service.notess(this.addnotesloginForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('Notes added succesfully')
            // this.router.navigate(['/Admin/Clientdetails'])
        
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  addvisiblitynoetess() {
    if (this.addvisiblitynotes.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("add Visiblity data", this.addvisiblitynotes.value);
      // return
      this.service.createmilestones(this.addvisiblitynotes.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('Milstone added succesfully')
            // this.router.navigate(['/Admin/Clients'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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

  timeInputs: number[] = [];
  getproffesionalssssss:any= []
  getproffesionalsss(): void {
    this.service.getproffesionals().subscribe({
      next: (res: any) => {
        this.getproffesionalssssss = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectedUsersss: any[] = [];
  roomNumbr: any;
  toggleSelectionss(user: any): void {
    const userIdsControl = this.loginForm.get('medicine_id');
    const index = this.selectedUsersss.findIndex((u) => u.id === user.id);
    if (index > -1) {
      this.selectedUsersss.splice(index, 1);
    } else {
      this.selectedUsersss.push(user);
    }
    userIdsControl?.setValue(this.selectedUsersss.map((u) => u.id));
  }
  isUserSelectedss(user: any): boolean {
    return this.selectedUsersss.some((u) => u.id === user.id);
  }

  submitRoom(): void {
    // Combine timeX values into a single string, separating them by commas
    const times = this.timeInputs.map((i) => this.loginForm.get(`time${i}`)?.value).filter(Boolean).join(' , ');
  
    // Log the collected times
    console.log('Collected times:', times);
  
    // Check if times are valid (not an empty string)
    if (!times) {
      console.error('Error: Time values are missing');
      return;
    }
  
    // Ensure that the time field is updated in the form
    this.loginForm.patchValue({ time: times });
  
    // Log the form after patching the time
    console.log('Form after patching time:', this.loginForm.value);
  
    const formValue = this.loginForm.value;
  
    // Remove individual timeX fields from formData (if they exist)
    Object.keys(formValue).forEach(key => {
      if (key.startsWith('time')) {
        delete formValue[key];
      }
    });
  
    // Ensure medicine_id is properly formatted as a comma-separated string
    const userIds = Array.isArray(formValue.medicine_id)
      ? formValue.medicine_id
      : formValue.medicine_id.split(',');
  
    // Create the final formData object including the time field
    const formData = {
      ...formValue,
      medicine_id: userIds.join(','),
      time: times, // Ensure the time field is added correctly here
    };
  
    // Log the final form data before submission
    console.log('Submitting form data:', formData);
  
    // Submit if the form is valid
    if (this.loginForm.valid) {
      console.log('addTaskresidenet created successfully',this.loginForm.value );
      // return
      this.service.addTaskresidenet(formData).subscribe({
        next: (response) => {
          console.log('Room created successfully', response);
          this.swet.SucessToast('Task Added succesfully')

          // this.router.navigate(['/Admin/Clients']);
        },
        error: (err) => {
          console.error('Error creating room:', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

   onFrequencyChange(): void {
      const frequency = this.loginForm.get('frequency')?.value;
      const count = frequency.split('-').filter((value: string) => value === '1').length;
  
      this.timeInputs = [];
      Object.keys(this.loginForm.controls).forEach((key) => {
        if (key.startsWith('time')) {
          this.loginForm.removeControl(key);
        }
      });
  
      for (let i = 0; i < count; i++) {
        this.timeInputs.push(i);
        this.loginForm.addControl(`time${i}`, new FormControl('', Validators.required));
      }
    }

    getLevelClass(level: string): string {
      switch (level.toLowerCase()) {
          case 'moderate':
              return 'moderate';
          case 'mild':
              return 'mild';
          case 'severe':
              return 'severe';
          default:
              return ''; // Default class (optional)
      }
  }

  marData: any[] = [];
  daysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  dates: string[] = [];
  currentMonth: number = new Date().getMonth(); // Current month (0-indexed)
  currentYear: number = new Date().getFullYear();
@ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
getReportMar() {
  this.service.getMarReport(this.clientid).subscribe(
    (res) => {
      console.log('MAR response:', res);
      this.marData = res;
      this.active_status = res[0].active_status;
      this.residentName = res[0].username;
      this.startDate = res[0].start_date;
    },
    (error) => {
      console.error('Error fetching MAR data:', error);
    }
  );
}

downloadPDF() {
  const DATA = this.pdfContent.nativeElement;

  // Temporarily show the hidden report to generate PDF
  this.pdfContent.nativeElement.style.display = 'block';

  html2canvas(DATA, { scale: 2 }).then((canvas) => {
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    let position = 0;

    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('Medication-Report.pdf');

    // Hide the report again after the PDF is generated
    this.pdfContent.nativeElement.style.display = 'none';
  }).catch((error) => {
    console.error('Error generating canvas:', error);

    // Ensure the report is hidden again if there's an error
    this.pdfContent.nativeElement.style.display = 'none';
  });
}


daysOfWeekForDates: string[] = [];

  generateMonthDates(month: number, year: number): void {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month
    const firstDay = new Date(year, month, 1).getDay(); // First day of the month (0 = Sunday)
  
    this.dates = [];
    this.daysOfWeekForDates = [];
  
    // Fill with blanks for alignment before the 1st day
    for (let i = 0; i < firstDay; i++) {
      this.dates.push('');
      this.daysOfWeekForDates.push('');
    }
  
    // Add actual dates and calculate corresponding days of the week
    for (let day = 1; day <= daysInMonth; day++) {
      this.dates.push(day.toString());
      const dayOfWeek = (firstDay + (day - 1)) % 7;
      this.daysOfWeekForDates.push(this.daysOfWeek[dayOfWeek]);
    }
  }
  isRoutineTimeMatched(data: any[], date: string): boolean {
    // console.log('data:', data);
    // console.log('date:', date);
    // console.log('Type of data:', typeof data);
    return data.some(d => d.routine_time.startsWith(date));
  }











getRoutineStatus(routineStatus: number): string {
  switch (routineStatus) {
    case 1:
      return 'Missed Med';
    case 2:
      return 'To Be Given';
    case 3:
      return 'Given';
    default:
      return 'Unknown Status';
  }
}
getStatusClass(routineStatus: number): string {
  switch (routineStatus) {
    case 1:
      return 'status-missed';
    case 2:
      return 'status-to-be-given';
    case 3:
      return 'status-given';
    default:
      return '';
  }
}
getStatusIcon(routineStatus: number): string {
  switch (routineStatus) {
    case 1:
      return 'fas fa-times-circle missed-icon'; // Red icon for missed
    case 2:
      return 'fas fa-clock to-be-given-icon'; // Yellow clock icon for to-be-given
    case 3:
      return 'fas fa-check-circle given-icon'; // Green check icon for given
    default:
      return 'fas fa-question-circle'; // Default unknown icon
  }
}

@ViewChild('facesheetContainer', { static: false }) facesheetContainer!: ElementRef;
downloadPDFFS(): void {
  const data = this.facesheetContainer.nativeElement;
  html2canvas(data, { scale: 2 }) // High resolution
    .then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('facesheet.pdf');
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
}
}
