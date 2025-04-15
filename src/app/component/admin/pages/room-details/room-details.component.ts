import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  addTaskForm: FormGroup;
  noteForm: FormGroup;
  ck: boolean = false;
  roomID: string = '';
  roomIDsend: any;
  userid: string | null;
  constructor(private route: ActivatedRoute, private sweet: SweetalertssService, private api: AllService, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    const roomNo = localStorage.getItem('roomID');
    const userId = localStorage.getItem('userId');

    this.userid = userId;

    this.roomIDsend = roomNo;
    this.addTaskForm = this.fb.group({
      project_id: [this.roomIDsend],
      user_id: [''],
      milestone_id: [''],
      title: [''],
      description: [''],
      priority: [''],
      start_date: [''],
      due_date: [''],
      time: [''],
      status: [''],
      task_message: [''],
      comment_count: [''],
    })

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    console.log('Current Time:', currentTime);
    this.noteForm = this.fb.group({
      user_id:[this.userid],
      description:['',Validators.required],
      title:['',Validators.required],
      time: [currentTime],
      room_id:[this.roomIDsend]
    });    
  }

  onSubmit(): void {
    if (this.addTaskForm.valid) {
      this.api.postTaskFromRoom(this.addTaskForm.value).subscribe((res: any) => {
        this.sweet.SucessToast('Task added succesfully')
        window.location.reload()
      })
      console.log('Form Data:', this.addTaskForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  allTasks: any[] = [];
  getTasks() {
    [
      this.api.getTasksOFRoom().subscribe((res: any) => {
        this.allTasks = res
      })
    ]
  }

  allData: any[] = []

  roomNumber: string = '';
  ngOnInit(): void {
    this.getTasks()
    this.roomnotesssgets()
  
    const roomData = localStorage.getItem('roomDetails');
    if (roomData) {
      this.ByIdData = JSON.parse(roomData);
      console.log("Retrieved room data:", this.ByIdData);
    }
    this.fetchRoomClients();
    this.fetchRoomUsers();

  }

  roomClients: any[] = [];
  fetchRoomClients(): void {
    this.api.getRoomClientsdata(null).subscribe({
      next: (data) => {
        this.roomClients = data.clients;
        console.log('Room clients:', this.roomClients);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch room users';
        console.error(error);
      }
    });
  }

  roomUsers: any[] = [];
  errorMessage: string = '';
  fetchRoomUsers(): void {
    this.api.getRoomUsersdata(null).subscribe({
      next: (data) => {
        this.roomUsers = data;
        console.log('Room users:', this.roomUsers);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch room users';
        console.error(error);
      }
    });
  }



  userData: any[] = [];

  id: any;
  ByIdData: any = [];
  roomDetails(data: any) {
    this.id = data;
    console.log("dataaaaa", this.id);

    this.api.getRoomDtls(data).subscribe((res: any) => {
      this.ByIdData = res;
      // console.log("policy by id", this.ByIdData);

      // Store the data in the service
      this.api.setRoomData(this.ByIdData);

      // Navigate to another component (optional)
      this.router.navigate(['/Admin/room-details']);
    });
  }

  userprofile() {
    this.router.navigate(['/Admin/Clientdetails'])
  }

  client_idss: any;
  userByIdDatas: any = [];
  ByIds(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.api.getuserById(data).subscribe((res: any) => {
      this.userByIdDatas = [res[0]];
      this.client_idss = res[0].id
      localStorage.setItem('clientdetails', JSON.stringify(this.userByIdDatas));
      localStorage.setItem('clientid', JSON.stringify(data));

      this.userprofile();

      this.api.setclientData(this.userByIdDatas);
      console.log("policy by id", this.userByIdDatas)
    })
  }

  userDetails: { [key: string]: { first_name: string; last_name: string } } = {};

  fetchUserDetails(userId: string) {
    // Check if user details are already fetched
    if (!this.userDetails[userId]) {
      this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
        // Assuming the API returns an array with one object
        const user = data[0]; // Access the first object in the array
        this.userDetails[userId] = {
          first_name: user.first_name,
          last_name: user.last_name
        };
      });
    }
  }

  getInitials(userId: string): string {
    const user = this.userDetails[userId];
    if (user) {
      const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
      const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
      return firstInitial || lastInitial ? `${firstInitial}${lastInitial}` : 'U';
    }
    return 'View'; // Default to 'U' while loading
  }



  addusers() {
    if (this.noteForm.invalid) {
      this.ck = true;
      return;
    } else {
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }); // Update with current local time
      this.noteForm.patchValue({ time: currentTime });
      console.log("Patient data", this.noteForm.value);
      
      this.api.roomnotess(this.noteForm.value).subscribe({
        next: (res) => {
          console.log("res", res)
          this.sweet.SucessToast('Notes added succesfully')
            this.api.clickwindowlocation();
        
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  allroomnotesssgets: any[] = [];
  roomnotesssgets() {
    [
      this.api.roomnotesss().subscribe((res: any) => {
        this.allroomnotesssgets = res
      })
    ]
  }


  
}
