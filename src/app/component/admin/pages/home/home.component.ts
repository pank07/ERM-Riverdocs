import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { Chart, registerables } from 'chart.js';
import { HelperservicessService } from 'src/app/helperservicess.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm!:FormGroup;
  appointmentForm!: FormGroup;
  eventForm!: FormGroup;
  userId: number | null;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service:AllService,
    private swet :SweetalertssService,
   private helper:HelperservicessService
  ){
    const userIdString = this.service.getlocalstoragevalue('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
  }

  ck: boolean = false;
  // redirect(){
  //     this.service.getsidebarmenu().subscribe((res:any)=>{
  //          this.helper.checkPermission(res ,'home');
  //          console.log( 'chala ki ni ' ,res);
  //         //  window.location.reload();
  //     });
  //   }

  

  ngOnInit(): void {

  //  this.redirect();

    this.appointmentForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });

    this.eventForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      date_returned: ['', Validators.required],
      note: ['', Validators.required],
      event_date: ['', Validators.required],
      event_time: ['', Validators.required],
      user_id: [this.userId, Validators.required],
    });

    this.getusersdatas()
    this.getcliwentsdatas()
    // this.getRooms()
    this.gettask();
    this.getTaskCounts();
    this.getCounts()
    this.getResident();
    this.care_task_homes();
    this.getAppointments()
    this.get_medication_task_home()
    this.getTaskCounts()
    this.getRoomStatus()
   this.getuserClientDetail()
    this.getRoomTaskStatus()
    this.getEvents()


    this.loginForm = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
    });


}

residentData:any[] = [];
getResident(){
  this.service.getclientsdata().subscribe((res:any)=>{
    this.residentData = res;
    console.log(res)
  })
}

roomStatusData:any[] = [];
getRoomStatus(){
  this.service.getRoomStatus().subscribe((res:any)=>{
    this.roomStatusData = res;
    console.log(res)
  })
}
userClientDetail:any;
getuserClientDetail(){
  this.service.get_user_client_detail().subscribe((res:any)=>{
   
    this.userClientDetail = res.data;

  })
}
medication_task:any;
get_medication_task_home(){
  this.service.medication_task_home().subscribe((res:any)=>{
   
    this.medication_task = res.data;

  })
}
care_task_home:any;
care_task_homes(){
  this.service.care_task_home().subscribe((res:any)=>{
   
    this.care_task_home = res.data;

  })
}

roomTaskStatusData:any[] = [];
getRoomTaskStatus(){
  this.service.getRoomTaskStatus().subscribe((res:any)=>{
    this.roomTaskStatusData = res;
    console.log(res)
  })
}

get f() {
  return this.appointmentForm.controls;
}

onSubmit() {
  if (this.appointmentForm.valid) {
    console.log(this.appointmentForm.value);
    this.service.postAppointment(this.appointmentForm.value).subscribe((res:any)=>{
      console.log(res)
      window.location.reload()
    })
  } else {
    console.log('Form is invalid');
  }
}

onSubmitEvent(): void {
  if (this.eventForm.valid) {
    console.log('Form Submitted:', this.eventForm.value);
    this.service.addEvent(this.eventForm.value).subscribe((res:any)=>{
      this.service.clickwindowlocation();
    })
  } else {
    console.log('Form is invalid');
  }
}
// user_client_detail

chart: any; // To store the chart instance
chart2: any; // To store the chart instance


createChart() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  if (this.chart) {
    this.chart.destroy(); // Destroy the old chart instance if it exists
  }

  this.chart = new Chart(ctx, {
    type: 'bar', // Change chart type as needed
    data: {
      labels: ['Rooms','Total Residents', 'Admitted Residents', ' Discharge Residents ' ], // Labels for the data
      datasets: [
        {
          label: 'Counts',
          data: [
            this.allCount.roomsCount,
           
            this.allCount.total_Clients_room,
            this.allCount.admit_Clients,
            this.allCount.discharge_Clients
          ], // Map data from API response
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Colors for the bars
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Ensure y-axis starts from zero
        },
      },
    },
  });
}

createTaskChart() {
  const ctx = document.getElementById('myTaskChart') as HTMLCanvasElement;

  if (this.chart2) {
    this.chart2.destroy(); // Destroy the old chart2 instance if it exists
  }

  this.chart2 = new Chart(ctx, {
    type: 'bar', // Change chart type as needed
    data: {
      labels: ['Tasks','Done Tasks', 'Missing Tasks', ' ToDo Tasks ' ], // Labels for the data
      datasets: [
        {
          label: 'Counts',
          data: [
            this.taskCount.totalTasks,
            this.taskCount.doneTasks,
            this.taskCount.missingTasks,
            this.taskCount.todoTasks
          ], // Map data from API response
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Colors for the bars
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Ensure y-axis starts from zero
        },
      },
    },
  });
}

allCount:any;
getCounts(){
  this.service.getGraph().subscribe((res:any)=>{
    this.allCount = res
    this.createChart();
  })
}
taskCount:any;
getTaskCounts(){
  this.service.getTaskGraph().subscribe((res:any)=>{
    this.taskCount = res
    this.createTaskChart();
  })
}

AppointmentsData:any;
getAppointments(){
  this.service.getAppointment().subscribe((res:any)=>{
    this.AppointmentsData = res
  })
}

eventsData:any;
getEvents(){
  this.service.getEvents().subscribe((res:any)=>{
    this.eventsData = res
  })
}


addusers() {
  if (this.loginForm.invalid) {
      this.ck = true;
      return;
  } else {
      console.log("Patient data", this.loginForm.value);
      this.service.createusersadmin(this.loginForm.value).subscribe({
          next: (res) => {
              console.log("res",res)
              if (res.success) {
                  this.router.navigate(['home'])
              }
          },
          error: (err) => {
              console.log(err);
          }
      });
  }
}


  logouts() {
    localStorage.removeItem('userId');
    localStorage.removeItem('group_id');
    localStorage.removeItem('group_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('workspace_id');
    

    this.router.navigateByUrl("/", { replaceUrl: true })
}


getusersData:any;
clients:any;
clientPercentage:any
userPercentage:any
getusersdatas() {
  this.service.getUsersdata().subscribe({
    next: (res: any) => {
      this.getusersData = res.length;
      const maxuser = 100;
      this.userPercentage = Math.min((this.getusersData / maxuser) * 100, 100);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

getcliwentsdatas() {
  this.service.getclientsdata().subscribe({
    next: (res: any) => {
      this.clients = res.length;
      const maxClients = 100;
      this.clientPercentage = Math.min((this.clients / maxClients) * 100, 100);
    },
    error: (err) => {
      console.log(err);
    },
  });
}


// allRooms:any[]=[];
// getRooms(){
//   this.service.getRooms().subscribe((res:any)=>{
//     this.allRooms = res.length
//   })
// }
allTask:any[]=[];
gettask(){
  this.service.getTaskGraph().subscribe((res:any)=>{
console.log(res);

  this.allTask=res.totalnotes


        // this.allRooms = res.length
      })
}



}