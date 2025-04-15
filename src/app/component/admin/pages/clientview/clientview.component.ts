import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HelperservicessService } from 'src/app/helperservicess.service';
import { TimeScale } from 'chart.js';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-clientview',
  templateUrl: './clientview.component.html',
  styleUrls: ['./clientview.component.css'],
  providers: [DatePipe]
})
export class ClientviewComponent {

  downloadPDF() {
    const element = document.querySelector('.facesheet-container') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('facesheet.pdf');
    });
  }


  residentDetails: any;


  activePopoverIndex: number | null = null;

  togglePopover(index: number): void {
    // Toggle the popover for the clicked index
    this.activePopoverIndex = this.activePopoverIndex === index ? null : index;
  }

  // loginForm!:FormGroup;
  updateForm!: FormGroup;
  password!: FormGroup;
  constructor(
    private service: AllService,
    private router: Router,
    private fb: FormBuilder,
    private swet: SweetalertssService,
    private datePipe: DatePipe,
    private helper: HelperservicessService
  ) {
    const userIdString = this.service.getlocalstoragevalue('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;


    this.updateForm = this.fb.group({
      email: [''],
      first_name: [''],
      last_name: ['',],
      date_of_birth: ['',],
      date_of_joining: ['',],
      designation: ['',],
      phone: [''],
    })


    this.password = this.fb.group({
      password: [''],
    })


  }

  getFormattedDate(): string {
    return this.datePipe.transform(this.userByIdData.date_of_birth, 'date') || '';
  }

  userId: any
  ck: boolean = false;
  hideFields: any = 1;
  dataSend: any

  ngOnInit(): void {
    this.getusersdatas();


  }
  getusersData: any = []
  arrayData: any = [];
  status: any = '';
  getusersdatas() {
    this.service.getclientsdata().subscribe({
      next: (res: any) => {
        if (this.helper.is_client()) {
          this.residentDetails = res
          this.residentDetails.forEach((element: any) => {

            if (element.id == this.userId) {
              this.arrayData.push(element);
              if (element.active == 0) {
                this.status = 'Inative'
              } else if (element.active == 1) {
                this.status = 'Admit'
              } else {
                this.status = 'Discharge'
              }
              this.getusersData = this.arrayData;
              this.hideFields = 0

            }
            console.log('resident detals', this.userId);

            console.log('all data', this.getusersData);

          });
        } else {
          this.getusersData = res;
          this.hideFields = 1;
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addClient() {
    this.router.navigate(['/Admin/Addclient'])
  }

  


  id: any;
  userByIdData: any = [];
  ById(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdData = res[0];
      // this.userprofile()
      this.service.setclientData(this.userByIdData);
      console.log("policy by id", this.userByIdData)
    })
  }



  facesheetgetbyisdata: any = [];
  ByIdgertbyid(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.facesheetgetbyis(data).subscribe((res: any) => {
      this.facesheetgetbyisdata = res[0];
      // this.userprofile()
      // this.service.setclientData(this.userByIdData);
      console.log("facesheetgetbyis", this.facesheetgetbyisdata)
    })
  }




  clearFaceSheet() {
    console.log("Clear FaceSheet button clicked.");
    this.facesheetgetbyisdata = [];
  }





  client_idss: any;
  roomId: any;
  userByIdDatas: any = [];
  ByIds(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdDatas = [res[0]];
      this.client_idss = res[0].id;
      this.roomId = res[0].room_id;
    
      localStorage.setItem('clientdetails', JSON.stringify(this.userByIdDatas));
      localStorage.setItem('clientid', JSON.stringify(data));
      localStorage.setItem('clientRoomId', JSON.stringify(this.roomId));

      this.userprofile(this.id)

      this.service.setclientData(this.userByIdDatas);
      console.log("policy by id", this.userByIdDatas)
    })
  }


  roomid:any
  ByIdsfacesheet(data: any) {
    this.id = data
    // console.log("user id", this.id)
    console.log("view client id",this.id);
    this.service.clientidface = this.id;
    // this.service.clientidfacesheetalldetails = this.id,
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdDatas = res;
      // console.log("this.userByIdDatas ByIdsfacesheet", this.userByIdDatas);
      // this.service.rommnoser = res[0].room_number
      // console.log("this.service.rommnoser clientpage",this.service.rommnoser);
      this.roomid = res[0].room_id;
      // localStorage.setItem('clientdetails', JSON.stringify(this.userByIdDatas));
      localStorage.setItem('clientRoomno', this.roomid.toString());
      // console.log("this.roomno client face", this.roomno);
    })
  }

  
  userprofile(id?:any) {
    this.router.navigate(['/Admin/Clientdetails/' + id])
  }

 

  updateusers() {


    const filteredPayload: any = {
      first_name: this.userByIdData.first_name,
      last_name: this.userByIdData.last_name,
      email: this.userByIdData.email,
      phone: this.userByIdData.phone,
      designation: this.userByIdData.designation,
      date_of_birth: this.userByIdData.date_of_birth,
      date_of_joining: this.userByIdData.date_of_joining,
      speciality: this.userByIdData.speciality,
      type: this.userByIdData.type,
      active: this.userByIdData.active,
      profile: this.userByIdData.profile,
      NPI: this.userByIdData.NPI,
    };
  
    // Remove unwanted keys
    delete filteredPayload.group_name;
    delete filteredPayload.group_id;
    delete filteredPayload.room_number;
    delete filteredPayload.room_id;
    delete filteredPayload.user_count;
  

    this.service.userupdatedss(this.id, filteredPayload).subscribe((res: any) => {
      console.log(' updated successfully', res);
      this.swet.SucessToast(`Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
    });
  }



  url: any; // For the current preview


  onSelectFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
        this.userByIdData.profile = reader.result; // Update the model
      };

      // File type and size validation
      const validFileTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (!validFileTypes.includes(file.type)) {
        alert('Invalid file type. Please select an image or a valid document.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size exceeds 2MB.');
        return;
      }
    }
  }



  updatestatuser() {
    this.service.Userstatusupdatess(this.id, this.userByIdData).subscribe((res: any) => {
      console.log('status updated successfully', res);
      this.swet.SucessToast(`Action Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
    });
  }








  // Convert the active value to the corresponding status string
  getStatus(active: number): string {
    switch (active) {
      case 1:
        return "1"; // Admit
      case 2:
        return "2"; // Discharge
      case 0:
      default:
        return "0"; // Inactive
    }
  }

  // Handle status updates
  updateStatus(user: any, newStatus: string) {
    const id = user.id;
    const updatedStatus = parseInt(newStatus, 10);

    this.dataSend = {
      active: updatedStatus,
    };

    this.service.clientstatusupdates(id, this.dataSend).subscribe(
      (res: any) => {
        if (res) {
          this.getusersdatas(); // Refresh user data
          console.log("uop", this.getusersdatas())
          const statusText = this.getStatusText(updatedStatus);
          this.swet.SucessToast(`Status updated to ${statusText} successfully!`);
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  // Convert the active number to a status label for toast messages
  // getStatusText(active: number): string {
  //   switch (active) {
  //     case 1:
  //       return "Admit";
  //     case 2:
  //       return "Discharge";
  //     case 0:
  //     default:
  //       return "Inactive";
  //   }
  // }



  getStatusText(active: number): string {
    switch (active) {
      case 1: // Admit
        return 'btn-success'; // Green
      case 2: // Discharge
        return 'btn-danger'; // Red
      case 0: // Inactive
      default:
        return 'btn-warning'; // Orange
    }
  }

  ByIdData: any = [];
  roomDetails(data: any) {
    this.id = data;
    console.log("dataaaaa", this.id);
    this.service.getRoomDtls(data).subscribe((res: any) => {
      this.ByIdData = res;
      this.service.setRoomData(this.ByIdData);
      this.router.navigate(['/Admin/room-details']);
    });
  }


  groupidchnagedata: any = [];
  groupidchnage(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.groupidchnagedata = res[0];
      // this.userprofile()
      console.log("groupidchnage by id", this.groupidchnagedata)
    })
  }

  // groupidchnagebyuserside() {
  //   this.service.groupidchangeByids(this.id, this.groupidchnagedata).subscribe((res: any) => {
  //     console.log(' updated successfully', res);
  //     this.swet.SucessToast(Updated Successfully);
  //   }, (error) => {
  //     console.error('Error updating user', error);
  //   });
  // }



  changeGroupId(groupId: number, userId: number) {
    const updatedData = { group_id: groupId };

    this.service.groupidchangeByids(userId, updatedData).subscribe(
      (res: any) => {
        console.log(`Group ID updated successfully for user ${userId}`, res);
        this.swet.SucessToast(`User's group changed successfully to ${groupId === 1 ? 'Admin' : groupId === 2 ? 'User' : 'Client'}`);
        this.groupidchnagedata.group_id = groupId; // Update local data if necessary
      },
      (error) => {
        console.error('Error updating group ID', error);
      }
    );
  }






  



  userByIdDatass: any = [];
  ByIdssss(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdDatass = res[0];
      // this.userprofile()

    })
  }




  // editpasswordsss() {
  //   this.service.editpasswordss( updatedData).subscribe((res: any) => {
  //     console.log(' updated successfully', res);
  //     this.swet.SucessToast(Updated Successfully);
  //     window.location.reload()
  //   }, (error) => {
  //     console.error('Error updating user', error);
  //   });
  // }



  editpasswordsss() {
    const updatedData = {
      email: this.userByIdData.email,
      password: this.userByIdData.password,
    };
    console.log(updatedData);
    
    this.service.editpasswordss(updatedData).subscribe(
      (res: any) => {
        console.log('Updated successfully', res);
        this.swet.SucessToast('Updated Successfully');
        // window.location.reload();
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }






}