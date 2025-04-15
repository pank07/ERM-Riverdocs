import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {






  addForm:FormGroup;
  editForm:FormGroup;
  msgForm:FormGroup;
  userId: number | null;

  constructor(private api: AllService, private fb:FormBuilder,private cdr: ChangeDetectorRef) {
    const userIdString = this.api.getlocalstoragevalue('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    this.addForm = this.fb.group({
      user_id:[this.userId],
      user_ids:[''],
      subject:[''],
      description:[''],
    })

    this.editForm = this.fb.group({
      user_id:[this.userId],
      subject:[''],
      description:[''],
      id:[''],
    })

    this.msgForm = this.fb.group({
      user_id:[this.userId],
      msg:[''],
      announcement_id:[''],
    })
  }

  announcementMsg(){
    const updatedMsgData = this.msgForm.value;
   
    console.log(updatedMsgData);
    

    this.api.addAnnoucementMsg(updatedMsgData).subscribe((res) => {
      console.log('Message added successfully:', res);
      this.api.clickwindowlocation();
    });
  }

  editAnnouncement() {
    const updatedData = this.editForm.value;
   
    this.api.addAnnoucement(updatedData).subscribe((res) => {
      console.log('Updated successfully:', res);
      this.api.clickwindowlocation();
    });
  }

  patchFormValues(announcement: any) {
    this.editForm.patchValue({
      id: announcement.id,
      subject: announcement.subject,
      description: announcement.description
    });
  }

  patchFormValuesMsg(announcement: any) {
    this.msgForm.patchValue({
      announcement_id: announcement.id,
      subject: announcement.subject,
    });

    this.getAnnouncementMsg(announcement.id);
  }
  

  submit(){
    const formValue = this.addForm.value;

    // Ensure user_ids and client_id are arrays before joining
    const userIds = Array.isArray(formValue.user_ids) ? formValue.user_ids : formValue.user_ids.split(',');
   

    const formData = {
      ...formValue,
      user_ids: userIds.join(','), // Convert user_ids array to string
     
    };
    console.log(formData);

    this.api.addAnnoucement(formData).subscribe((res:any)=>{
      this.api.clickwindowlocation();
    })

  }

  selectedUsers: any[] = [];
  searchControl = this.fb.control('');

  toggleSelection(user: any): void {
    const userIdsControl = this.addForm.get('user_ids');

    const index = this.selectedUsers.findIndex((u) => u.id === user.id);

    if (index > -1) {
      // If the user is already selected, remove them
      this.selectedUsers.splice(index, 1);
    } else {
      // Add the user to the selection
      this.selectedUsers.push(user);
    }

    // Update the user_ids form control with the selected user IDs
    userIdsControl?.setValue(this.selectedUsers.map((u) => u.id));
  }

  isUserSelected(user: any): boolean {
    return this.selectedUsers.some((u) => u.id === user.id);
  }

  get filteredUsers() {
    const query = this.searchControl.value?.toLowerCase() || '';
    return this.userData.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query)
    );
  }


  userData: any[] = [];
  users: any[] = [];
  ngOnInit(): void {
    this.getAnnouncement();
    this.getUsers();
  }


  announcementMessages: any[] = [];
  getAnnouncementMsg(id: any): void {
    this.api.getAnnoucementMsg(id).subscribe((response: any) => {
      this.announcementMessages = response; // Adjust according to your API response
    });
  }

  getUsers() {
    this.api.getUsersdata().subscribe((res: any) => {
      this.userData = res;
      this.users = res;
    });
  }

  allData: any[] = [];
  getAnnouncement() {
    this.api.getAnnouncement().subscribe((res: any) => {
      this.allData = res;
      this.cdr.detectChanges();
    })
  }

  trackById(index: number, item: any): number {
    return item.id; // Adjust the property name if necessary
  }
  

}






