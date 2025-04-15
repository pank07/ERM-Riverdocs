import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './shared/add-users/add-users.component';
import { SidebarSettingComponent } from './pages/sidebar-setting/sidebar-setting.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserGroupPermissionComponent } from './pages/setting/user-group-permission/user-group-permission.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';
import { ClientviewComponent } from './pages/clientview/clientview.component';
import { AddclientComponent } from './shared/addclient/addclient.component';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';
import { RoomTasksComponent } from './pages/room-tasks/room-tasks.component';
import { AddRoutineComponent } from './shared/add-routine/add-routine.component';
import { AddTaskComponent } from './shared/add-task/add-task.component';
import { AddMildstoneComponent } from './shared/add-mildstone/add-mildstone.component';
import { AddMedesComponent } from './shared/add-medes/add-medes.component';
import { RoomActivityComponent } from './pages/Activity Logs/room-activity/room-activity.component';
import { CommentActivityComponent } from './pages/Activity Logs/comment-activity/comment-activity.component';
import { MilestoneActivityComponent } from './pages/Activity Logs/milestone-activity/milestone-activity.component';
import { MedicineActivityComponent } from './pages/Activity Logs/medicine-activity/medicine-activity.component';
import { TaskActivityComponent } from './pages/Activity Logs/task-activity/task-activity.component';
import { StatusActivityComponent } from './pages/Activity Logs/status-activity/status-activity.component';
import { SettingActivityComponent } from './pages/Activity Logs/setting-activity/setting-activity.component';
import { UnitActivityComponent } from './pages/Activity Logs/unit-activity/unit-activity.component';
import { FrequencyActivityComponent } from './pages/Activity Logs/frequency-activity/frequency-activity.component';
import { StatusComponent } from './pages/status/status.component';
import { AddstatusComponent } from './shared/addstatus/addstatus.component';
import { MedicationComponent } from './pages/medication/medication.component';
import { UnitComponent } from './pages/unit/unit.component';
import { AddunitComponent } from './shared/addunit/addunit.component';
import { AddResidentNoteComponent } from './shared/add-resident-note/add-resident-note.component';
import { AddUserDocsComponent } from './shared/add-user-docs/add-user-docs.component';
import { AddResidentDocsComponent } from './shared/add-resident-docs/add-resident-docs.component';
import { AddroomnotesComponent } from './pages/addroomnotes/addroomnotes.component';
import { UserDetailsPipe } from 'src/app/user-details.pipe';
import { MedicationPnrComponent } from './medication-pnr/medication-pnr.component';
import { AddmedicationpnrComponent } from './shared/addmedicationpnr/addmedicationpnr.component';
import { MedicalproffesionalComponent } from './pages/medicalproffesional/medicalproffesional.component';
import { AddmedicalproffesionalComponent } from './shared/addmedicalproffesional/addmedicalproffesional.component';
import { MedicalproffesionaldetailsComponent } from './pages/medicalproffesionaldetails/medicalproffesionaldetails.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PrnInventoryComponent } from './prn-inventory/prn-inventory.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PurchasedOrderComponent } from './purchased-order/purchased-order.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FacesheetpagesComponent } from './pages/facesheetpages/facesheetpages.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { Select2Directive } from 'src/app/select2.directive';




@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    UsersComponent,
    AddUsersComponent,
    SidebarSettingComponent,
    UserGroupPermissionComponent,
    RoomsComponent,
    RoomDetailsComponent,
    UserdetailsComponent,
    ClientviewComponent,
    AddclientComponent,
    ClientdetailsComponent,
    RoomTasksComponent,
    AddRoutineComponent,
    AddTaskComponent,
    AddMildstoneComponent,
    AddMedesComponent,
    RoomActivityComponent,
    CommentActivityComponent,
    MilestoneActivityComponent,
    MedicineActivityComponent,
    TaskActivityComponent,
    StatusActivityComponent,
    SettingActivityComponent,
    UnitActivityComponent,
    FrequencyActivityComponent,
    StatusComponent,
    AddstatusComponent,
    MedicationComponent,
    UnitComponent,
    AddunitComponent,
    AddResidentNoteComponent,
    AddUserDocsComponent,
    AddResidentDocsComponent,
    AddroomnotesComponent,
    UserDetailsPipe,
    MedicationPnrComponent,
    AddmedicationpnrComponent,
    InventoryComponent,
    PrnInventoryComponent,
    PharmacyComponent,
    PurchasedOrderComponent,
    SupplierComponent,
    AddmedicationpnrComponent,
    MedicalproffesionalComponent,
    AddmedicalproffesionalComponent,
    MedicalproffesionaldetailsComponent,
    FacesheetpagesComponent,
    AnnouncementsComponent,
    Select2Directive
  ],
  exports:[UserDetailsPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule,
    ColorPickerModule,
]
})
export class AdminModule { }
