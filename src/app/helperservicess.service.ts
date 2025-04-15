import { Injectable } from '@angular/core';
import { AllService } from './Api/all.service';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperservicessService {
  private userGroupDataSubject = new BehaviorSubject<any>(null); // BehaviorSubject to track changes
  private userPermissionDataSubject = new BehaviorSubject<any>(null); // Subject for user permissions
  usergroupdata$ = this.userGroupDataSubject.asObservable();
  userperdata$ = this.userPermissionDataSubject.asObservable();

  getss: any;
  userId: any;




   

  constructor(private allser: AllService) {


    
    const gopup_ids = this.allser.getlocalstoragevalue('group_id');
   
    
    const userId = this.allser.getlocalstoragevalue('userId');
   

    if (!gopup_ids) {
      this.getss = this.grouPID;
    }
    if (!userId) {
      this.userId = this.idUSer;
    }
    this.userId = userId;
    this.getss = gopup_ids;
  }

  updatedata: any;

  getData() {

    this.allser.getUserPermisssion(this.userId).subscribe((res: any) => {
      this.userPermissionDataSubject.next(res); // Update the permission data
    });
  }

  getDataGroup() {

    if (!this.getss) {
      this.getss = this.updatedata;
    }

    this.allser.groupidchangeByidsss(this.getss).subscribe((res: any) => {
      //  const val = new HttpHeaders({
      //       'Content-type': 'application/json',
      //       Authkey: ` ${this.allser.get}`,
      //   });

      this.userGroupDataSubject.next(res); // Update the group data
    });
  }

  gautam: any;
  idUSer: any;
  grouPID: any;

  lol() {
    if (!this.gautam) {
      this.gautam = this.getss;
    }
  }

  checkPermission(res: any) {
    this.getDataGroup();
    this.getData();

    if (!Array.isArray(res)) {
      console.error("Invalid input: 'res' is not an array");
      return [];
    }

    // Use async pipe or subscribe to data before processing
    this.userGroupDataSubject.subscribe(usergroupdata => {
 
      if (!usergroupdata) {
        this.getDataGroup();
      }

      this.userPermissionDataSubject.subscribe(userperdata => {

        res?.forEach((resdata: any) => {
          resdata.permission = null;
          usergroupdata?.forEach((gropuper: any) => {
            if (resdata.side_name_old === gropuper.permission_name) {
              resdata.permission = gropuper.permission;
            }
          });
          userperdata?.forEach((userper: any) => {
            if (resdata.side_name_old === userper.permission_name) {
              resdata.permission = userper.permission;
            }
          });
        });
      });
    });

    return res;
  }

  is_admin() {
    this.lol();
    return this.gautam === 1;
  }

  is_client() {
    this.lol();
    return this.gautam === 3;
  }

  is_user() {
    this.lol();
    return this.gautam === 2;
  }
}