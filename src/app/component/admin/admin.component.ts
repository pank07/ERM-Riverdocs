import { Component, OnInit, ElementRef, ViewChild, AfterViewInit ,HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { HelperservicessService } from 'src/app/helperservicess.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  // gengerateChln = "none";
  // Open popup and mark all notifications as read
  // openPopup(): void {
  //   this.showModal = true;
  //   this.markAsRead();
  // }

  // // Close popup
  // closePopup(): void {
  
  //   this.showModal = false;
  // }

  @ViewChild('cameraFeed', { static: false }) cameraFeed!: ElementRef<HTMLVideoElement>;
  @ViewChild('mySidebar', { static: false }) mySidebar!: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLElement>;

  private viewInitialized = false;
  isOnline: boolean = navigator.onLine;

  @HostListener('window:online', ['$event'])
  @HostListener('window:offline', ['$event'])
  updateOnlineStatus(event?: Event) {
    this.isOnline = navigator.onLine;
  }

  ngAfterViewInit() {
    this.viewInitialized = true;

    // Debugging: Check if the elements are properly initialized
    
  }

  toggleNav() {
    if (!this.viewInitialized || !this.mySidebar || !this.content) {
      console.error('View is not fully initialized or elements are undefined.');
      return;
    }

    console.log("toggle");
    
    const sidebar = this.mySidebar.nativeElement;
    const content = this.content.nativeElement;

    sidebar.classList.toggle('closed');

    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('open');
    }
  }

  openCamera() {
    if (!this.viewInitialized || !this.cameraFeed) {
      console.error('View is not fully initialized or camera feed is undefined.');
      return;
    }

    const videoElement = this.cameraFeed.nativeElement;

    // Access the camera and display the video feed
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.style.display = 'block';
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
        });
    } else {
      alert('Camera is not supported on this device.');
    }
  }



  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,
    private helper: HelperservicessService,
    
    private themeService: ThemeService
  ) {

  }

loginname:any
logilastname:any

currentDateTime: Date = new Date();

  



 


  ngOnInit(): void {
    this.currentDateTime = new Date();
    this.loginname = this.service.getlocalstoragevalue('first_name')
    this.logilastname = this.service.getlocalstoragevalue('last_name')
    
    this.themeService.loadThemeSettingsFromApi();
this.helper.getData();
this.helper.getDataGroup();
    this.getsidebarsdata();
    this.getSubMenus()
    // this.selectedLanguage = sessionStorage.getItem('language') || 'French';
    this.selectedLanguage = sessionStorage.getItem('language') || 'French';

    this.getLogo();
    this.getNotification();
  }


  notifys: any[] = [];
  noti:any;
  unreadCount: number = 0;
  showModal: boolean = false;
  selectedNotification: any = null;
  
  // Fetch notifications
  getNotification(){
    this.service.getNotification(null).subscribe({
      next: (data) => {
        // console.log('Notifications API Response:', data);
        this.notifys = Array.isArray(data) ? data : [];
        // this.noti = data;
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Failed to fetch notifications:', error);
        this.notifys = []; // Fallback to an empty array
      },
    });
  }

  // Open modal to show notifications
  openModal(): void {
    this.showModal = true;
    this.selectedNotification = null; // Reset selected notification when modal is opened
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Select a specific notification
  selectNotification(notify: any): void {
    this.selectedNotification = notify;

    if (!notify.read) {
      this.markAsRead(notify);
    }
  }

  // Mark a single notification as read
  markAsRead(notify: any): void {
    notify.read = true; // Update local read status
    this.updateUnreadCount();

    // Optionally, send to backend to update read status
    this.service.markAsRead(notify.id).subscribe({
      next: () => console.log(`Notification ${notify.id} marked as read.`),
      error: (error) => console.error('Error marking notification as read:', error),
    });
  }

  // Update unread count
  updateUnreadCount(): void {
    this.unreadCount = this.notifys.filter((notify) => !notify.read).length;
  }

  logoGet: any[] = [];
  selectedLogo: string = '';
  defaultLogo: string = 'https://media.istockphoto.com/id/863958328/vector/stethoscope-icon.jpg?s=612x612&w=0&k=20&c=to7jGDQ9xktMUmA1CjHs5Dg_9Xg9fwhG2M5jOR-NtXk='; 
  getLogo() {
    this.service.getLogo().subscribe((res: any) => {
      this.logoGet = res
      const item = this.logoGet.find((data: any) => data.id === 2);
      // Assign the logo only if it exists
      this.selectedLogo = item && item.logo ? item.logo : this.defaultLogo;
    })
  }

  logouts() {
    localStorage.removeItem('userId');
    localStorage.removeItem('group_id');
    localStorage.removeItem('group_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('user_token');
    localStorage.removeItem('username');
    localStorage.removeItem('workspace_id');
    localStorage.removeItem('roomDetails');
    localStorage.removeItem('roomNumber');
    localStorage.removeItem('clientdetails');
    localStorage.removeItem('clientid');
    localStorage.removeItem('roomID');
    localStorage.removeItem('clientRoomId');
    localStorage.removeItem('clientRoomno');

    
    
    this.router.navigateByUrl("/", { replaceUrl: true })
  }

  sideData: any[] = [];
  side:any[]=[];
  getsidebarsdata() {
    this.service.getsidebarmenu().subscribe({
      next: (res) => {
        if (!Array.isArray(res)) {
          console.error("Invalid response: 'res' is not an array", res);
          return;
        }
  
        // console.log("res sidebar data", res);
  
        // Ensure `checkPermission` handles errors gracefully.
        this.side = this.helper.checkPermission(res);
  
        if (Array.isArray(this.side)) {
          // Sort `res` based on the position property.
          this.sideData = [...this.side].sort((a: any, b: any) => a.position - b.position);
        } else {
          console.error("Invalid data returned by checkPermission:", this.side);
          this.sideData = [];
        }
  
        console.log("this.sideData", this.sideData);
      },
      error: (err) => {
        console.log("Error in fetching sidebar menu:", err);
      },
    });
  }
  
  
  subMenuData: any[] = [];
  getSubMenus() {
    this.service.getsubmenu().subscribe({
      next: (res: any) => {
        this.subMenuData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }





  getFilteredSubMenus(parentId: number) {
    return this.subMenuData.filter(sub => sub.parent_id === parentId);
  }



  // handelclick(){
  //   forkJoin([this.getsidefirst(),this.getsecond()]).subscribe({
  //   next:(res)=>{
  //     // res[0] first api data
  //     // res[1] first api data
  //   },
  //   error:(err)=>{

  //   }
  //   })
  // }

  // getsidefirst(){
  //   this.service.getsidebarmenu().subscribe({
  //       next: (res) => {

  //           console.log("res sidebar data",res)
  //           this.sideData = res
  //       },
  //       error: (err) => {
  //           console.log(err);
  //       }
  //   });
  // }


  // getsecond(){
  //   this.service.getsidebarmenu().subscribe({
  //       next: (res) => {
  //           console.log("res sidebar data",res)
  //           this.sideData = res
  //       },
  //       error: (err) => {
  //           console.log(err);
  //       }
  //   });
  // }





  languages = [
    { name: 'English', flagCode: 'us' },
    { name: 'French', flagCode: 'fr' },
    { name: 'Spanish', flagCode: 'es' },
    { name: 'Portuguese', flagCode: 'pt' },
    { name: 'Hindi', flagCode: 'in' },
    { name: 'Russian', flagCode: 'ru' },
    { name: 'German', flagCode: 'de' },
    { name: 'Arabic', flagCode: 'ae' },
    { name: 'Chinese', flagCode: 'cn' },
  ];
  selectedLanguage = 'French';





  // Change Language
  // changeLanguage(language: string): void {
  //   this.selectedLanguage = language;
  //   sessionStorage.setItem('language', language);

  //   this.service.changeLanguage(language).subscribe({
  //     next: () => console.log(`Language changed to ${language}`),
  //     error: (err) => console.error('Error changing language:', err),
  //   });
  // }

  // // Get Language Flag Code
  // getFlagCode(language: string): string {
  //   const lang = this.languages.find((l) => l.name === language);
  //   return lang ? lang.flagCode : 'fr';
  // }


  // changeLanguage(language: string): void {
  //   this.selectedLanguage = language;
  //   sessionStorage.setItem('language', language);
  //   this.service.changeLanguage(language).subscribe({
  //     next: () => console.log(`Language changed to ${language}`),
  //     error: (err) => console.error('Error changing language:', err),
  //   });
  // }

  // getFlagCode(language: string): string {
  //   const lang = this.languages.find(l => l.name === language);
  //   return lang ? lang.flagCode : 'fr';
  // }

  is_admin(): boolean {
    return this.helper.is_admin();
  }
  
  is_client(): boolean {
    return this.helper.is_client();
  }
  
  is_user(): boolean {
    return this.helper.is_user();
  }


  checkpermisstion(side:any) {
    this.helper.getData();
this.helper.getDataGroup();
    return this.helper.checkPermission(side);
  }



  online(){
    // window.addEventListener('online',()=>{
    //   console.log('yes online') 
    // })

    window.addEventListener("online", (event) => {
      console.log("1stThe network connection has been lost.");
    });
    
    // onoffline version
    window.ononline = (event) => {
      console.log("2dThe network connection has been lost.");
    };

  }
  offline(){
    // window.addEventListener('offline',()=>{
    //   console.log('yes oofline');
    // })
    window.addEventListener("offline", (event) => {
      console.log("1stThe network connection has been lost.");
    });
    
    // onoffline version
    window.onoffline = (event) => {
      console.log("2ndThe network connection has been lost.");
    };


  }

  
}








