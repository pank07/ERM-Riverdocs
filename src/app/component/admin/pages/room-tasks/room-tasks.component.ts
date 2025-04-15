import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-room-tasks',
  templateUrl: './room-tasks.component.html',
  styleUrls: ['./room-tasks.component.css']
})
export class RoomTasksComponent implements OnInit {
  addTaskForm: FormGroup;
  addCommentForm: FormGroup;

  roomID: string = '';
  roomIDsend: any;

  taskId!: number;
  taskCommentsCount: { [taskId: number]: number } = {};
  tasks: any[] = []; // Array to store tasks
  taskComments: { [taskId: number]: any[] } = {};
  selectedTask: any;

  constructor(private route: ActivatedRoute, private sweet: SweetalertssService, private api: AllService, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    const roomNo = localStorage.getItem('roomID');
    this.roomIDsend = roomNo;
    this.addTaskForm = this.fb.group({
      project_id: [this.roomIDsend],
      user_id: ['1'],
      milestone_id: ['1'],
      name: ['demo'],
      description: ['ddddd'],
      priority: ['1'],
      start_date: [''],
      due_date: [''],
      time: [''],
      status: ['1'],
      task_message: ['agagaga'],
    })

    this.addCommentForm = this.fb.group({
      project_id: [this.roomIDsend],
      user_id: [''],
      task_id: [''],
      comment: [''],
    })
  }


  // getByTaksId:any;
  // selectedTask: any;
  // setCommentFormData(task: any) {
  //   this.selectedTask = task;
  //   this.loadCommentsForTask(task.id);
  //   this.getByTaksId = task.id
  //   console.log( 'taks id is here' ,this.getByTaksId);
    
  //   this.addCommentForm.patchValue({
  //     project_id: task.project_id, // Pass project ID from the task object
  //     user_id: task.user_id,       // Pass user ID(s) from the task object
  //     task_id: task.id,            // Pass task ID from the task object
  //     comment: ''  ,                // Empty field for user input
      
  //   });
  // }

  // taskCommentsCount: { [taskId: number]: number } = {};
  // loadCommentsForTask(taskId: number) {
  //   this.taskComments = {}; // Clear previous task comments
  //   this.api.getComments2(taskId).subscribe((res: any[]) => {
  //     this.taskComments[taskId] = res.filter(comment => comment.task_id === taskId);
  //     this.taskCommentsCount[taskId] = this.taskComments[taskId].length;
  //     console.log('Comments for Task:', taskId, this.taskComments[taskId]);
  //   });
  // }

  // loadAllComments(taskId: number) {
  //   this.api.getComments2(taskId).subscribe((res: any[]) => {
  //     this.taskCommentsCount = {};
  //     res.forEach(comment => {
  //       if (!this.taskCommentsCount[comment.task_id]) {
  //         this.taskCommentsCount[comment.task_id] = 0;
  //       }
  //       this.taskCommentsCount[comment.task_id]++;
  //     });
  //   });
  // }


   // Fetch tasks and their comments
   loadTasksAndComments() {
    // Fetch all tasks or tasks related to this taskId
    this.api.getComments2(this.taskId).subscribe((tasks: any[]) => {
      this.tasks = tasks;
      this.loadAllTaskCommentCounts();
    });
  }

  // Fetch all comment counts
  loadAllTaskCommentCounts() {
    this.api.getComments().subscribe((comments: any[]) => {
      this.taskCommentsCount = {};
      comments.forEach(comment => {
        if (!this.taskCommentsCount[comment.task_id]) {
          this.taskCommentsCount[comment.task_id] = 0;
        }
        this.taskCommentsCount[comment.task_id]++;
      });
    });
  }

  // Set the comment form data for a selected task
  setCommentFormData(task: any) {
    this.selectedTask = task;
    this.loadCommentsForTask(task.id);

    // Assuming you have a FormGroup for adding comments
    this.addCommentForm.patchValue({
      project_id: task.project_id,
      user_id: task.user_id,
      task_id: task.id,
      comment: '',
    });
  }

  // Load specific task comments
  loadCommentsForTask(taskId: number) {
    this.api.getComments2(taskId).subscribe((res: any[]) => {
      this.taskComments[taskId] = res.filter(comment => comment.task_id === taskId);
    });
  }
  

  onSubmitComment() {
    if (this.addCommentForm.valid) {
      const formData = this.addCommentForm.value;
      console.log('Posting Comment:', formData);

      // // Example: HTTP POST request
      this.api.postComments(formData).subscribe((res) => {
        this.sweet.SucessToast('Comment added successfully')
        window.location.reload()
      });
    } else {
      console.error('Form is invalid!');
    }
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

  ByIdData: any = [];

  ngOnInit(): void {
    const roomData = localStorage.getItem('roomDetails');
    if (roomData) {
      this.ByIdData = JSON.parse(roomData);
      console.log("Retrieved room data:", this.ByIdData);
    }

    this.route.params.subscribe(params => {
      this.taskId = +params['taskId']; // Assuming 'taskId' is a parameter in the route
      this.loadTasksAndComments();
    });

    this.fetchRoomUsers();
    // this.getTasks();
    // this.loadAllComments();
    this.loadAllTaskCommentCounts();
    this.getRoomTasks();
  }

  allComments: any;
  commentsGet() {
    this.api.getComments().subscribe((res: any) => {
      this.allComments = res
      // this.commentsGetForAllTasks();
    })
  }

  // taskComments: { [taskId: string]: any[] } = {};

  // commentsGet() {
  //   this.api.getComments().subscribe((res: any[]) => {
     
  //     this.taskComments = res.reduce((acc: { [taskId: string]: any[] }, comment) => {
  //       const taskId = comment.task_id; 
  //       if (!acc[taskId]) {
  //         acc[taskId] = [];
  //       }
  //       acc[taskId].push(comment);
  //       return acc;
  //     }, {});
  //     console.log('Mapped Comments:', this.taskComments);
      
  //   });
  // }

  // fetchCommentsForTask(task_id: string) {
  //   this.api.getCommentsByTaskId(task_id).subscribe((res: any) => {
  //     this.taskComments[task_id] = res;
  //     console.log('Comments for Task ID', task_id, ':', res); // To debug and see the fetched comments
  //   });
  // }
  

  // commentsGetForAllTasks() {
  //   if (this.allComments.length > 0) {
  //     this.allComments.forEach((task: any) => {
  //       this.fetchCommentsForTask(task.id); 
  //     });
  //   }
  // }
  

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

  // allTasks: any[] = [];
  // getTasks() {
  //  this.api.getTasksOFRoom().subscribe((res: any) => {
  //   this.allTasks = res;
  //    // After fetching tasks, fetch comments for each task.
  // });
  // }

  thisRoomTasks:any[] = [];
  thisRoomTasksID:any;
  getRoomTasks(): void {
    this.api.getRoomTasksById(null).subscribe({
      next: (res) => {
        this.thisRoomTasks = res;
        this.thisRoomTasksID = res[0].id;
        console.log('This rom tasks:', this.thisRoomTasks);
        console.log('This tasks id:', this.thisRoomTasksID);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch room users';
        console.error(error);
      }
    });
  }

  id:any;
  commentsByTaskIdData: any = [];
  ByIds(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.api.getCommentsByTaskId(data).subscribe((res: any) => {
      this.commentsByTaskIdData = [res[0]];
      console.log("policy by id", this.commentsByTaskIdData)
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
    return 'User'; // Default to 'U' while loading
  }

}
