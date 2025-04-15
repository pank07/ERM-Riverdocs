import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
interface Permission {
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
@Component({
  selector: 'app-user-group-permission',
  templateUrl: './user-group-permission.component.html',
  styleUrls: ['./user-group-permission.component.css']
})
export class UserGroupPermissionComponent  implements OnInit{
  roles!:FormGroup;
  updateForm!: FormGroup;
id: any;
ByIdsideMenu: any = [];
ByIdsubMenu: any = [];
sideData: any[] = [];
ck: boolean = false;


constructor(private service: AllService,
  private swet:SweetalertssService,
  private route:Router,
  private fb:FormBuilder
) {
 
}
ngOnInit(): void {

  this.roles= this.fb.group({
    description: ['',],
    name: ['',],
  });

   this.updateForm = this.fb.group({
    descriptions_role: [''],
    names_role: [''],
  })
  this.getsidebarsdata();
  this.getgroupsszz();
}

sideMenuById(data: any) {
  this.id = data;

}





updatePermissions(module: any, role: string, event: any): void {
  const updatedValue = event.target.checked ? 1 : 0;
  const updatePayload = { ...this.ByIdsideMenu };
  updatePayload[role] = updatedValue.toString();
  this.service.permissiongroupssss(module.id, updatePayload).subscribe({
    next: (res) => {
      console.log('Permissions updated successfully:', res);
      // this.getsidebarsdata();
      // window.location.reload();
    },
    error: (err) => {
      console.error('Error updating permissions:', err);
    }
  });
}
sidedatamy:any;
getsidebarsdata(): void {
  this.service.getsidebarmenu().subscribe({
    next: (res) => {
      this.sideData = res;
this.sidedatamy = res;

    },
    error: (err) => {
      console.error('Error fetching sidebar data:', err);
    }
  });
}

userByIdData: any = [];
getBygroupsss(data: any) {
  this.id = data;
  console.log("user id", this.id);
  this.service.groupidchangeByidsss(data).subscribe((res: any) => {
      if (Array.isArray(res) && Array.isArray(this.sidedatamy)) {
          res.forEach((element: any) => {
              this.sidedatamy.forEach((loldata: any) => {
                  if (element.sidebar_id === loldata.id) {
                      if (!Array.isArray(element.name)) {
                          element.name = []; // Initialize as an empty array if not already
                      }
                      element.name.push(loldata.side_name);
                  }
              });
          });
      } else {
          console.error("Invalid data structure for res or sidedatamy.");
      }
      this.userByIdData =res

      console.log("sidedatamy", this.sidedatamy);
      console.log("groupidchangeByidsss", this.userByIdData);
  });
}





// new roles and group
getgroupss:any=[]
getgroupsszz(){
  this.service.getgroup().subscribe({
    next: (res) => {
      this.getgroupss = res;
    },
    error: (err) => {
      console.error('Error fetching sidebar data:', err);
    }
  });
}


addroles() {
  if (this.roles.invalid) {
    this.ck = true;
    return;
  } else {
    console.log("Patient data", this.roles.value);

    this.service.addgroup(this.roles.value).subscribe({
      next: (res) => {
        console.log("res roles", res)
        this.swet.SucessToast(`roles Added succesfully`)
        this.route.navigate(['/Admin/roles'])
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}





data_name:any;
data_description:any;
lol_id:any;
getBygroups(data: any) {
console.log("data getbt", data);
this.lol_id = data.id;
this.data_name = data.name;
this.data_description = data.description;

}


editSideunitss() {
  this.service.updategroup(this.lol_id,this.updateForm.value).subscribe((res: any) => {
    console.log(this.updateForm.value);
    
  // const titless=  res.title
    // this.swet.SucessToast(`Group Updated Successfully  ${titless}`)
    // window.location.reload()
  }, (error) => {
    console.error('Error updating user', error);

  });
}






}
