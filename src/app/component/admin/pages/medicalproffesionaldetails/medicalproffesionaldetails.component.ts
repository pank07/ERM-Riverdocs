import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-medicalproffesionaldetails',
  templateUrl: './medicalproffesionaldetails.component.html',
  styleUrls: ['./medicalproffesionaldetails.component.css']
})
export class MedicalproffesionaldetailsComponent {
  @ViewChild('checkbox') checkbox: any;
  addCommentForm!: FormGroup;
  constructor(
    private service: AllService,
    private route: Router,
    private fb: FormBuilder,
    private swet: SweetalertssService,
    private router: Router
  ) {

    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
  }
  userId: any

  faceSheetForm!: FormGroup;
  loginForm!: FormGroup;
  selectedUsers: any[] = [];
  selectedMedicineIds: any[] = [];
  allData: any[] = []
  clientDataid: any;
  ngOnInit(): void {

    this.getuserstaskdatas();
    this.getTasksOFUsers()
    this.getmedicinesusers()
    this.getssmilestone()
    this.getnotess()
    this.getmedicipnr()
   



    const clientData = this.service.getclientData();
    this.allData = clientData
    this.clientDataid = clientData[0].id
    console.log("Received client data:", clientData);
    console.log("Received client id:", this.clientDataid);


    this.faceSheetForm = this.fb.group({

      facility_name: ['',],
      // user_id: [this.userId],
      name: ['',],
      dob: ['',],
      client_id: [this.clientDataid],
      gender: [],
      // uci: `test${Date.now()}@gmail.com`,
      uci: [],
      room_number: [],
      bed_number: [],
      insurance_id: [],
      other_insurance: [],
      state_benefits: [],
      placement_date: [],
      previous_address: [],
      weight: [],
      height: [],
      eye_color: [],
      hair_color: [],
      diagnosis: [],
      diet: [],
      food_restrictions: [],
      medical_needs: [],
      medication_name: [],
      dosage: [],
      frequency: [],
      prescribing_md: [],
      allergies: [],
      physician: [],
      dentist: [],
      psychiatrist: [],
      pharmacy: [],
      dangerous_propensities: [],
    });



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

 
  

      this.fetchClientData();
    this.ByIdgetbytaskid()
    this.loadAllComments();
    this.residentbymedicalprofessionalsss();
  }



  addpostfacesheets() {
    if (this.faceSheetForm.invalid) {
  
      return;
    } else {
      console.log("Patient data", this.faceSheetForm.value);

      this.service.postfacesheets(this.faceSheetForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.swet.SucessToast('faceSheetForm Added succesfully')
          this.router.navigate(['/Admin/Clientdetails'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  fetchClientData() {
    this.service.facesheetgetbyis(this.clientDataid).subscribe({
      next: (data) => {
        // console.log('API Response:', data[0]);

        if (data[0]) {
          // Check if the data keys match the form control names.
          this.faceSheetForm.patchValue({
            facility_name: data.facility_name,
            name: data.name,
            dob: data.dob,
            client_id: data.client_id,
            gender: data.gender,
            uci: data.uci,
            room_number: data.room_number,
            bed_number: data.bed_number,
            insurance_id: data.insurance_id,
            other_insurance: data.other_insurance,
            state_benefits: data.state_benefits,
            placement_date: data.placement_date,
            previous_address: data.previous_address,
            weight: data.weight,
            height: data.height,
            eye_color: data.eye_color,
            hair_color: data.hair_color,
            diagnosis: data.diagnosis,
            diet: data.diet,
            food_restrictions: data.food_restrictions,
            medical_needs: data.medical_needs,
            medication_name: data.medication_name,
            dosage: data.dosage,
            frequency: data.frequency,
            prescribing_md: data.prescribing_md,
            allergies: data.allergies,
            physician: data.physician,
            dentist: data.dentist,
            psychiatrist: data.psychiatrist,
            pharmacy: data.pharmacy,
            dangerous_propensities: data.dangerous_propensities,
          });
        } else {
          console.log('No data found for client ID:', this.clientDataid);
        }
      },
      error: (err) => {
        console.error('Error fetching client data:', err);
      },
    });
  }


  getusertaskdataData: any = []
  routinelength: any
  getuserstaskdatas(): void {
    this.service.getroutines().subscribe({
      next: (res: any) => {
        this.getusertaskdataData = res;
        this.routinelength = res.length;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  tasklength: any;
  getTasksOFUserss: any = []
  getTasksOFUsers(): void {
    this.service.getTasksOFRoom().subscribe({
      next: (res: any) => {
        this.getTasksOFUserss = res;
        // console.log("q", this.getTasksOFUserss)

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
    this.route.navigate(['/Admin/addusers'])
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

  openmedsTab() {
    const tabButton = document.getElementById('nav-contact-tab');
    if (tabButton) {
      tabButton.click();
    }
  } opentaskTab() {
    const tabButton = document.getElementById('nav-profile-tab');
    if (tabButton) {
      tabButton.click();
    }
  } openmildstoneTab() {
    const tabButton = document.getElementById('nav-mildstone-tab');
    if (tabButton) {
      tabButton.click();
    }
  }

  userByIdDatasss: any = [];
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
      // console.log("after check data sttsus 3 ")
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
  
  // Function to post form data
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
  
  
  // Function to post form data
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
    this.service.dailytasks(this.clientDataid).subscribe((res: any[]) => {
      // console.log('Tasks received:', res); // Debugging log
      this.userByIdDatasss = res;
      this.userByIdDatasssmedicine_id = res[0].medicine_id;
      console.log("daily medicine_id", this.userByIdDatasssmedicine_id);


  this.userByIdDatasss.array.forEach((element:any )=> {
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



  residentbymedicalprofessionalssss:any=[];
  residentbymedicalprofessionalsss(): void {
    this.service.residentbymedicalprofessionals(this.clientDataid).subscribe((res: any[]) => {
      // console.log('Tasks received:', res); // Debugging log
      this.residentbymedicalprofessionalssss = res;
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
  

}