import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  addDoc:FormGroup;
mainId:any;


  constructor(
    private service:AllService,private fb:FormBuilder
  ){
    this.addDoc = this.fb.group({
      document:[''],
      title:[''],
      user_id:[this.mainId]
    })
  }

  files: File[] = [];
  onDragOver(event: DragEvent) {
    event.preventDefault(); 
  }
  onDrop(event: DragEvent) {
    event.preventDefault(); 
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFileInput(event.dataTransfer.files);
    }
  }
  handleFileInput(fileList: FileList) {
    Array.from(fileList).forEach((file) => {
      this.files.push(file);
    });
  }
  onFileDropped(event: any) {
    console.log('CDK Drop List event:', event);
  }

  uploadFiles() {
    this.addDoc.value.document = this.url;
    console.log('form added', this.addDoc.value)

  this.service.postStaffDoc(this.addDoc.value).subscribe((res:any)=>{
    window.location.reload()

  })
  }

  
url:any;

onSelectFile(event: any) {
  let file = event.target.files[0];
  console.log('hello', file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.url = reader.result;
    console.log('lo', this.url);
    this.addDoc.value.document = reader.result;
  };
  if (event.target.files && event.target.files[0]) {
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png' ||
      event.target.files[0].type === 'image/jpg' ||
      event.target.files[0].type === 'application/pdf' ||
      event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      if (event.target.files[0].size < 200 * 200) {
        / Checking height  width*/
      }
      if (event.target.files[0].size < 20000) {
        / checking size here - 2MB /
      }
    }
  }
}

  allData:any[] = []
  ngOnInit(): void {
    const userData = this.service.getUserData();
    this.allData = userData;
    this.mainId = userData[0].id
    console.log("Receive user data:", userData);
    console.log(" user id:", this.mainId);
    this.getDocs();
    this.taskbyuseridsss();
  }

  getAllDocs: any[] = [];
filteredDocs: any = [];

  getDocs(): void {
  this.service.getStaffDocs().subscribe((res: any) => {
    this.getAllDocs = res;

    console.log("Raw getAllDocs data:", this.getAllDocs);
    console.log("Raw allData:", this.allData);

    // Filter docs based on user_id in getAllDocs and id in allData
    this.filteredDocs = this.getAllDocs.filter((doc: any) =>
      this.allData.some((user: any) => {
        console.log("Comparing doc.user_id:", +doc.user_id, "with user.id:", +user.id);
        return +user.id === +doc.user_id; // Force comparison as numbers
      })
    );

    console.log("Filtered docs:", this.filteredDocs);
   
    // if (this.filteredDocs.length > 0) {
    //   this.userId = this.filteredDocs[0].id;
    //   console.log("First filtered doc ID:", this.userId);
    // } else {
    //   console.log("No matching documents found in filteredDocs.");
    // }

    console.log("Filtered docs:", this.filteredDocs);
  });
}





getbydatasss: any = [];
taskbyuseridsss(): void {
  console.log(",this.mainId", this.mainId)
  this.service.taskbyuseridss(this.mainId).subscribe((res: any) => {
    this.getbydatasss = res[0];
    console.log("getusertaskby res", this.getbydatasss)
  });
}

}
