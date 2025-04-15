import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './shared/add-users/add-users.component';
import { SidebarSettingComponent } from './pages/sidebar-setting/sidebar-setting.component';
import { UserGroupPermissionComponent } from './pages/setting/user-group-permission/user-group-permission.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';
import { ClientviewComponent } from './pages/clientview/clientview.component';
import { AddclientComponent } from './shared/addclient/addclient.component';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';
import { RoomTasksComponent } from './pages/room-tasks/room-tasks.component';
import { AddRoutineComponent } from './shared/add-routine/add-routine.component';
import { AddTaskComponent } from './shared/add-task/add-task.component';
import { AddMedesComponent } from './shared/add-medes/add-medes.component';
import { AddMildstoneComponent } from './shared/add-mildstone/add-mildstone.component';
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
import { CommunicationComponent } from '../Categories/communication/communication.component';
import { WorkCareerEducationComponent } from '../Categories/work-career-education/work-career-education.component';
import { TransportationComponent } from '../Categories/transportation/transportation.component';
import { SelfCareComponent } from '../Categories/self-care/self-care.component';
import { SafetyComponent } from '../Categories/safety/safety.component';
import { PersonalAurEmotionalGrowthComponent } from '../Categories/personal-aur-emotional-growth/personal-aur-emotional-growth.component';
import { HealthMedicalComponent } from '../Categories/health-medical/health-medical.component';
import { EpsdtComponent } from '../Categories/epsdt/epsdt.component';
import { DentalComponent } from '../Categories/dental/dental.component';
import { CurrentProvidersComponent } from '../Categories/current-providers/current-providers.component';
import { CurrentMedicationsComponent } from '../Categories/current-medications/current-medications.component';
import { CommunityAurSocialInvolvementComponent } from '../Categories/community-aur-social-involvement/community-aur-social-involvement.component';
import { AddResidentNoteComponent } from './shared/add-resident-note/add-resident-note.component';
import { AddroomnotesComponent } from './pages/addroomnotes/addroomnotes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddmedicationpnrComponent } from './shared/addmedicationpnr/addmedicationpnr.component';
import { MedicationPnrComponent } from './medication-pnr/medication-pnr.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PrnInventoryComponent } from './prn-inventory/prn-inventory.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PurchasedOrderComponent } from './purchased-order/purchased-order.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MedicalproffesionalComponent } from './pages/medicalproffesional/medicalproffesional.component';
import { AddmedicalproffesionalComponent } from './shared/addmedicalproffesional/addmedicalproffesional.component';
import { MedicalproffesionaldetailsComponent } from './pages/medicalproffesionaldetails/medicalproffesionaldetails.component';
import { FacesheetpagesComponent } from './pages/facesheetpages/facesheetpages.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        redirectTo:'Home',
        pathMatch:'full',
        
      },
      {
        path:'Home',
        component:HomeComponent,
        
      },
      {
        path:'addusers',
        component:AddUsersComponent
      },
      {
        path:'Users',
        component:UsersComponent
      },
      {
        path:'setting',
        component:SidebarSettingComponent
      },
      {
        path:'roles',
        component:UserGroupPermissionComponent
      },
      {
        path:'Projects',
        component:RoomsComponent
      },
      {
        path:'room-details',
        component:RoomDetailsComponent,
      },
      {
        path:'roomnotes',
        component:AddroomnotesComponent,
      },
      {
        path:'Userdetails',
        component:UserdetailsComponent
      },
      {
        path:'Userdetails/:id',
        component:UserdetailsComponent
      },
      {
        path:'Clients',
        component:ClientviewComponent
      }, 
      
      {
        path:'Addclient',
        component:AddclientComponent
      },
      {
        path:'Clientdetails',
        component:ClientdetailsComponent
      },
      {
        path:'Clientdetails/:id',
        component:ClientdetailsComponent
      },
      {
        path:'Facesheetpages/:id',
        component:FacesheetpagesComponent
      },

      
      {
        path:'room_tasks',
        component:RoomTasksComponent
      },
      {
        path:'addroutine',
        component:AddRoutineComponent
      },
      {
        path:'addtask',
        component:AddTaskComponent
      },
      {
        path:'addmedes',
        component:AddMedesComponent
      },
      {
        path:'addmildstone',
        component:AddMildstoneComponent
      },
      {
        path:'addResidentNote',
        component:AddResidentNoteComponent
      },
      {
        path:'Room Activity',
        component:RoomActivityComponent
      },
      {
        path:'Comment Activity',
        component:CommentActivityComponent
      },
      {
        path:'Milestone Activity',
        component:MilestoneActivityComponent
      },
      {
        path:'Medicine Activity',
        component:MedicineActivityComponent
      },
      {
        path:'Task Activity',
        component:TaskActivityComponent
      },
      {
        path:'Status Activity',
        component:StatusActivityComponent
      },
      {
        path:'Setting Activity',
        component:SettingActivityComponent
      },
      {
        path:'Unit Activity',
        component:UnitActivityComponent
      },
      {
        path:'Frequency Activity',
        component:FrequencyActivityComponent
      },{
        path:'Statuses',
        component:StatusComponent
      },
      {
        path:'Addstatus',
        component:AddstatusComponent
      },
      {
        path:'medication',
        component:MedicationComponent
      },
      {
        path:'unit',
        component:UnitComponent
      },

      {
        path:'Addunit',
        component:AddunitComponent
      },
      {
        path:'Medical Professionals',
        component:MedicalproffesionalComponent
      },
      {
        path:'Addmedicalproffesional',
        component:AddmedicalproffesionalComponent
      },
      {
        path:'Medicalproffesionaldetails',
        component:MedicalproffesionaldetailsComponent
      },
      
{
       
        path:'communication',
        component:CommunicationComponent
      },
      {
        path:'community-and-social-involvement',
        component:CommunityAurSocialInvolvementComponent
      },
      {
        path:'current-medications',
        component:CurrentMedicationsComponent
      },
      {
        path:'current-providers',
        component:CurrentProvidersComponent
      },
      {
        path:'dental',
        component:DentalComponent
      },
      {
        path:'epsdt',
        component:EpsdtComponent
      },
      {
        path:'health-medical',
        component:HealthMedicalComponent
      },
      {
        path:'personal-and-emotional-growth',
        component:PersonalAurEmotionalGrowthComponent
      },
      {
        path:'safety',
        component:SafetyComponent
      },
      {
        path:'self-care',
        component:SelfCareComponent
      },
      {
        path:'transportation',
        component:TransportationComponent
      },
      {
        path:'work-career-education',
        component:WorkCareerEducationComponent
      },
      {
        path:'AddmedicationPrn',
        component:AddmedicationpnrComponent
      },
      {
        path:'MedicationPRN',
        component:MedicationPnrComponent
      },
      {
        path:'Inventory Medicine',
        component:InventoryComponent
      },
      {
        path:'Inventory Prnmedicine',
        component:PrnInventoryComponent
      },
      {
        path:'Pharmacy',
        component:PharmacyComponent
      },
      {
        path:'Purchase Order',
        component:PurchasedOrderComponent
      },
      {
        path:'Supplier',
        component:SupplierComponent
      },
      {
        path:'Facesheetpages',
        component:FacesheetpagesComponent
      },
      {
        path:'Announcement',
        component:AnnouncementsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
