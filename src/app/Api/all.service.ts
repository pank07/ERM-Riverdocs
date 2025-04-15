import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpService } from '../Http/httpServices';
import { superAdminEndPoints } from '../Urls/ApiUrl';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';


// import { io, Socket } from 'socket.io-client';

export interface ThemeSettings {
  header_font: string;
  sidebar_color: string;
  header_color: string;
  sidebar_font: string;
}

@Injectable({
  providedIn: 'root'
})

export class AllService extends HttpService {


  // setlocalstoragevalue(value: string) {
   

  // }

  secretKey = 'mySecretKey';
  setlocalstoragevalue(key:string, value: string, ) {
    // Encrypt the value before storing in localStorage
    const encryptedData = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    // console.log('Encrypted Data:', encryptedData);
    // Store the encrypted data in localStorage
    localStorage.setItem(key, encryptedData);
  }

  getlocalstoragevalue(key:string){
     // Example: Decrypt the value (if needed, e.g., for testing or retrieval)
     const storedEncryptedData = localStorage.getItem(key);
     if (storedEncryptedData) {
       const bytes = CryptoJS.AES.decrypt(storedEncryptedData, this.secretKey);
       const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      //  console.log('Decrypted Data:', decryptedData);
       return decryptedData
     }
      return false

  }
  



  private apiUrl = `${environment.mainapi}theme`;
  private apiUrlNoty = `${environment.mainapi}`;

  // Fetch theme settings from API
  fetchThemeSettings(): Observable<ThemeSettings> {
    return this.http.get<ThemeSettings>(this.apiUrl);
  }

  // Update theme settings through the API
  updateThemeSettings(themeSettings: ThemeSettings): Observable<any> {
    return this.http.put(this.apiUrl, themeSettings);
  }

  getNotification(params: any) {
    const userId = this.getlocalstoragevalue('userId')

    return this.http.get<any[]>(`${this.apiUrlNoty}notification_details/` + userId, { params });
  }



  // markAllAsRead(notifications: any[]): Observable<void> {
  //   const userId = localStorage.getItem('userId')

  //   const payload = notifications.map((notify) => ({
  //     id: notify.id,
  //     user_id: userId,
  //     // read: true,
  //   }));
  //   return this.http.post<void>(`${this.apiUrlNoty}/readnotification`, payload);
  // }

  markAsRead(notificationId: number): Observable<void> {
    const userId = this.getlocalstoragevalue('userId')

    return this.http.post<void>(`${this.apiUrlNoty}readnotification`, {
      id: notificationId,
      user_id: userId,
    });
  }

  // getNotification(id: any) {
  //   const userId = localStorage.getItem('userId')
  //   return this.get(superAdminEndPoints.getNotification + userId)
  // }

  // private socket: Socket;



  // setHeaderColor(color: string) {
  //   this.headerColor = color;
  //   document.documentElement.style.setProperty('--header-color', color);
  // }

  // setSidebarColor(color: string) {
  //   this.sidebarColor = color;
  //   document.documentElement.style.setProperty('--sidebar-color', color);
  // }

  // setHeaderFontColor(color: string) {
  //   this.headerFontColor = color;
  //   document.documentElement.style.setProperty('--header-font-color', color);
  // }

  // setSidebarFontColor(color: string) {
  //   this.sidebarFontColor = color;
  //   document.documentElement.style.setProperty('--sidebar-font-color', color);
  // }



  // getHeaderColor() {
  //   return this.headerColor;
  // }
  // getHeaderFontColor() {
  //   return this.headerFontColor;
  // }

  // getSidebarFontColor() {
  //   return this.sidebarFontColor;
  // }

  // getSidebarColor() {
  //   return this.sidebarColor;
  // }


  constructor(public override http: HttpClient,
  ) {
    super(http)
    // this.socket = io('http://192.168.1.231:5000');
  }

  // sendNotification(message: any) {
  //   this.socket.emit('send-notification', message);
  // }

  // getNotify(){
  //   return this.get(superAdminEndPoints.getNotification)
  // }

  // onNotificationReceived(callback: (data: any) => void) {
  //   this.socket.on('receive-notification', callback);
  // }

  superAdminLogin(data: any) {
    return this.post(superAdminEndPoints.superAdminLogin, data)
  }
  createusersadmin(data: any) {
    return this.post(superAdminEndPoints.createusers, data)
  }

  createclients(data: any) {
    return this.post(superAdminEndPoints.createclient, data)
  }

  getsidebarmenu() {
    return this.get(superAdminEndPoints.getsidebar)
  }

  getUserPermisssion(id: any) {
    return this.get(superAdminEndPoints.getUSerPermission + id)
  }

  sibeMenuById(id: any) {
    return this.get(superAdminEndPoints.SidebarByID + id)
  }

  SidebarByIDs(id: any) {
    return this.get(superAdminEndPoints.SidebarByIDs + id)
  }

  sidebarUSerpermissionByids(data: any) {
    return this.post(`${superAdminEndPoints.postUSerPermission}`, data);
  }

  sidebarpermissionByids(id: any, data: any) {
    return this.put(`${superAdminEndPoints.sidebarpermissionByid}/${id}`, data);
  }

  permissiongroupssss(id: any, data: any) {
    return this.put(`${superAdminEndPoints.permissiongroupss}/${id}`, data);
  }





  // SidebarByIDs(id: any) {
  //   return this.get(`${superAdminEndPoints.SidebarByIDs}/${id}`);
  // }

  // getsidebarmenu() {
  //   return this.get(superAdminEndPoints.getsidebarmenu); // Assuming this endpoint exists
  // }

  subSideMenuById(id: any) {
    return this.get(superAdminEndPoints.SubSidebarByID + id)
  }

  //  editSideMenuName(id:any,data:any){
  //   return this.put(superAdminEndPoints.SidebarByID + id , data )
  //  }

  editSideMenuName(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.SidebarByID + id, updatedData);
  }






  GetByIDunits(id: any) {
    return this.get(superAdminEndPoints.GetByunitByid + id)
  }

  GetBymedicine_detailss(id: any) {
    return this.get(superAdminEndPoints.GetBymedicine_details + id)
  }

  GetBypnrmedicine_detailss(id: any) {
    return this.get(superAdminEndPoints.GetBypnrmedicine_details + id)
  }


  


  deleteGetByIDunits(id: any) {
    return this.delete(superAdminEndPoints.GetByunitByid + id)
  }

  editSideunits(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.editunitByid + id, updatedData);
  }

  editGetBymedicines(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.editGetBymedicine + id, updatedData);
  }

  
  editpnrmedicines(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.editpnrmedicine + id, updatedData);
  }


  



  editSubSideMenuName(id: any, updatedData: any) {
    return this.put(superAdminEndPoints.SubSidebarByID + id, updatedData);
  }

  getsubmenu() {
    return this.get(superAdminEndPoints.getSubMenu)
  }

  getUsersdata() {
    return this.get(superAdminEndPoints.getUsers)
  }

  //  getRoomUsersdata(id:any){
  //   const roomNo = localStorage.getgetTasksOFRoomItem('roomNumber')
  //   return this.get(superAdminEndPoints.getRoomUsers + roomNo )
  //  }

  getRoomClientsdata(id: any): Observable<any> {
    const roomNo = localStorage.getItem('roomNumber');
    return this.get(superAdminEndPoints.getRoomClients + roomNo);
  }

  getgroupid() {
    const group_idss = localStorage.getItem('group_id');
    return group_idss;
  }

  getUSerId() {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  getgroupname() {
    const group_namesss = localStorage.getItem('group_name');
    return group_namesss;
  }

  getRoomUsersdata(id: any): Observable<any> {
    const roomNo = localStorage.getItem('roomNumber');
    return this.get(superAdminEndPoints.getRoomUsers + roomNo);
  }

  getTasksOFRoom() {
    return this.get(superAdminEndPoints.addTask)
  }

  getmedicines() {
    return this.get(superAdminEndPoints.getmedicine)
  }

  addmedinice(data: any) {
    return this.post(superAdminEndPoints.getmedicine, data)
  }

  notess(data: any) {
    return this.post(superAdminEndPoints.notes, data)
  }
  roomnotess(data: any) {
    return this.post(superAdminEndPoints.roomnotes, data)
  }

  roomnotesss() {
    return this.get(superAdminEndPoints.roomnotes)
  }

  userroomnotesdetailsss(id: any) {
    return this.get(superAdminEndPoints.userroomnotesdetailss + id)
  }

  taskbyuseridss(id: any) {
    return this.get(superAdminEndPoints.taskbyuserids + id)
  }

  getroutines() {
    return this.get(superAdminEndPoints.routines)
  }

  getnotes() {
    return this.get(superAdminEndPoints.notes)
  }

  addroutines(data: any) {
    return this.post(superAdminEndPoints.routines, data)
  }

  Usersdatasfilter(order: string = 'first_name', sort: string = 'DESC', limit: number = 10, offset: number = 0, search: string = '') {
    const url = `${superAdminEndPoints.getUsers}?order=${order}&sort=${sort}&limit=${limit}&offset=${offset}&search=${search}`;
    return this.get(url); // Assuming you have a 'get' method to make the API call
  }

  getclientsdata() {
    return this.get(superAdminEndPoints.getclients)
  }

  gertmilestoness() {
    return this.get(superAdminEndPoints.gertmilestones)
  }

  getproffesionals() {
    return this.get(superAdminEndPoints.getproffesional)
  }


  Addproffesional(data: any) {
    return this.post(superAdminEndPoints.getproffesional, data)
  }





  getmildstonebyclientID(id: any) {
    return this.get(superAdminEndPoints.gertmilestonesBYClientId + id)
  }

  createmilestones(data: any) {
    return this.post(superAdminEndPoints.createmilestoness, data)
  }

  getClients() {
    return this.get(superAdminEndPoints.getClientss)
  }

  postRoomData(data: any) {
    return this.post(superAdminEndPoints.createRooms, data)
  }

  getRooms() {
    return this.get(superAdminEndPoints.rooms)
  }

  getRoomDtls(id: any) {
    return this.get(superAdminEndPoints.roomDetails + id)
  }

  getUserDtlsRooms(id: any) {
    return this.get(superAdminEndPoints.userDetailsForRoom + id)
  }

  getRoomsDtlsRooms(id: any) {
    return this.get(superAdminEndPoints.userDetailsForRoom + id)
  }

  private roomData: any;

  setRoomData(data: any) {
    this.roomData = data;
  }

  getRoomData() {
    return this.roomData;
  }

  // deleteRoom(id:any){
  //     const userid = localStorage.getItem('userId')
  //   return this.delete(superAdminEndPoints.roomsDelete + id )
  //  }

  roomUpdate(id: any, data: any) {
    return this.put(superAdminEndPoints.roomUpdate + id, data)
  }

  deleteRoom(id: any) {
    const userid = localStorage.getItem('userId');

    // Create a payload object
    const payload = {
      user_id: userid,
    };

    // Make the DELETE request and include the payload
    return this.http.delete(
      `${superAdminEndPoints.roomsDelete}${id}`,
      {
        body: payload
      }
    );
  }



  private userData: any;

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }



  private clientData: any;

  setclientData(data: any) {
    this.clientData = data;
  }

  getclientData() {
    return this.clientData;
  }

  //  roomsgetbyuseridss(id:any){
  //   return this.get(superAdminEndPoints.roomsgetbyuserid + id )
  //  }

  updateMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }

  getToken() {
    const tokkn = this.getlocalstoragevalue("user_token");
    const wspace = localStorage.getItem("workspace_id");
    return { tokkn, wspace }
  }

  updateSubMenu(url: string, payload: any, options?: { headers: HttpHeaders }): Observable<any> {
    return this.http.put(url, payload, options);
  }


  public clientidface:any
  public clientidfacesheetalldetails:any

  public rommnoser:any
  getuserById(id: any) {
    return this.get(superAdminEndPoints.getUsersByid + id)
  }

  facesheetgetbyis(id: any) {
    return this.get(superAdminEndPoints.facesheetgetbyis + id)
  }


  userupdatedss(id: any, data: any) {
    return this.put(superAdminEndPoints.Usersupdate + id, data)
  }

  updatemedicalprofessionalss(id: any, data: any) {
    return this.put(superAdminEndPoints.updatemedicalprofessional + id, data)
  }




  groupidchangeByids(id: any, data: any) {
    return this.put(superAdminEndPoints.groupidchangeByid + id, data)
  }

  putacesheetgetbyidesssslatests(id: any, data: any) {
    return this.put(superAdminEndPoints.putacesheetgetbyidesssslatest + id, data)
  }



  





  groupidchangeByidsss(id: any,) {
    return this.get(superAdminEndPoints.groupidchangeByidss + id)
  }



  changeResidentStatus(data: any) {
    return this.patch(superAdminEndPoints.changeResidentStatus, data)
  }




  medicineinventoryadds(id: any, data: any) {
    return this.patch(superAdminEndPoints.medicineinventoryadd + id, data)
  }



  // sidebarpermissionByids(id: any, data: any) {
  //   return this.put(superAdminEndPoints.sidebarpermissionByid + id, data)
  // }






  Userstatusupdatess(id: any, data: any) {
    return this.patch(superAdminEndPoints.Userstatusupdate + id, data)
  }

  InstatusStatusupdatess(id: any, data: any) {
    return this.patch(superAdminEndPoints.InstatusStatusupdate + id, data)
  }


  userpatchmethod(id: any, data: any) {
    return this.patch(superAdminEndPoints.statusUpdtedput + id, data)
  }

  getbyidfacesheet_basicinfos(id: any) {
    return this.get(superAdminEndPoints.facesheet_basicinfo_details + id)
  }

  getbyidfacesheet_insurance(id:any){
    return this.get(superAdminEndPoints.getbyidfacesheet_insurance +id)
  }


  facesheet_facility_info_details(id: any) {
    return this.get(superAdminEndPoints.facesheet_facility_info_details + id)
  }

  facesheet_medical_service_details(id: any) {
    return this.get(superAdminEndPoints.facesheet_medical_service_details + id)
  }

  




  


  





  getStatusById(id: any) {
    return this.get(superAdminEndPoints.statusUpdtedGetById + id)
  }

  allactiveststuss() {
    return this.get(superAdminEndPoints.allactiveststus)
  }



  frequencyss() {
    return this.get(superAdminEndPoints.frequencys)
  }


  uinitsdata() {
    return this.get(superAdminEndPoints.uinitsdatas)
  }

  uinitsdatapost(data: any) {
    return this.post(superAdminEndPoints.uinitsdataspost, data)
  }

  postfacesheetinfo(data:any){
    return this.post(superAdminEndPoints.postfacesheetbasicinfo,data)
  }

  poostfacesheetfacilityinfo(data:any){
    return this.post(superAdminEndPoints.postfacesheetfacilityinfo,data)
  }

  postfacesheetmedicalservices(data:any){
    return this.post(superAdminEndPoints.postfacesheetmedicalservice,data)
  }


  postfacesheet_allergiess(data:any){
    return this.post(superAdminEndPoints.postfacesheet_allergies,data)
  }

  addmedicalhistoryssss(data:any){
    return this.post(superAdminEndPoints.postmedicalhistoryssss,data)

  }
  


  insurancepost(data:any){
    return this.post(superAdminEndPoints.postfacesheet_insurance,data)
  }

  postfacesheet_diagnoses(data:any){
    return this.post(superAdminEndPoints.postfacesheet_diagnoses,data)
  }

  getbyidfacesheet_diagnoses(id:any){
    return this.get(superAdminEndPoints.getbyidfacesheet_diagnoses + id)
  }


  getbyidmedical_historyss(id:any){
    return this.get(superAdminEndPoints.getbyidmedical_history + id)
  }


  
  finalfacesheetss(id:any){
    return this.get(superAdminEndPoints.finalfacesheet + id)
  }


  
  


  getbyidfacesheet_allergiess(id:any){
    return this.get(superAdminEndPoints.getbyidfacesheet_allergies + id)
  }

  

  


  postfacesheets(data: any) {
    return this.post(superAdminEndPoints.postfacesheet, data)
  }

  //  times(){
  //   return this.get(superAdminEndPoints.timesdata )
  //  }

  clientstatusupdates(id: any, data: any) {
    return this.patch(superAdminEndPoints.clientstatusupdatess + id, data)
  }

  changeLanguage(language: string): Observable<any> {
    return this.http.get(`${superAdminEndPoints.changeLanguage}${language}`);
  }

  postTaskFromRoom(data: any) {
    return this.post(superAdminEndPoints.roomTaksAdd, data)
  }


  
  addTaskresidenet(data: any) {
    return this.post(superAdminEndPoints.addTask, data)
  }


  

  postComments(data: any) {
    return this.post(superAdminEndPoints.postComment, data)
  }
  postaddstatus(data: any) {
    return this.post(superAdminEndPoints.addstatus, data)
  }

  getstatus() {
    return this.get(superAdminEndPoints.addstatus)
  }

  getComments() {
    return this.get(superAdminEndPoints.comment)
  }

  getComments2(id: any) {
    return this.get(superAdminEndPoints.comment + id)
  }

  getCommentsByTaskId(id: string) {
    // const url = `${superAdminEndPoints.comment}${task_id}`;
    // return this.get(url);
    return this.get(superAdminEndPoints.comment + id)
  }


  postLogo(data: any) {
    return this.put(superAdminEndPoints.mainLogo + 2, data)
  }

  postLoginLogo(data: any) {
    return this.put(superAdminEndPoints.loginLogo + 1, data)
  }

  postFavLogo(data: any) {
    return this.put(superAdminEndPoints.faviLogo + 3, data)
  }

  getLogo() {
    return this.get(superAdminEndPoints.logoGet)
  }

  getroomactivity() {
    return this.get(superAdminEndPoints.roomactivity)
  }
  getcommentactivity() {
    return this.get(superAdminEndPoints.commentactivity)
  }
  getmedicineactivity() {
    return this.get(superAdminEndPoints.medicineactivity)
  }

  getmilestoneactivity() {
    return this.get(superAdminEndPoints.milestoneactivity)
  }

  gettaskactivity() {
    return this.get(superAdminEndPoints.taskactivity)
  }

  getstatusactivity() {
    return this.get(superAdminEndPoints.statusactivity)
  }
  getSettingactivity() {
    return this.get(superAdminEndPoints.settingactivity)
  }
  getunitactivity() {
    return this.get(superAdminEndPoints.unitactivity)
  }
  getfrequencyactivity() {
    return this.get(superAdminEndPoints.frequencyactivity)
  }


  // Categories functions

  currentProviderGet() {
    return this.get(superAdminEndPoints.currentProviderGet)
  }

  currentProvider(data: any) {
    return this.post(superAdminEndPoints.currentProviderAdd, data)
  }

  currentMedicationGet() {
    return this.get(superAdminEndPoints.currentMedicationGet)
  }

  currentMedication(data: any) {
    return this.post(superAdminEndPoints.currentMedication, data)
  }

  dentalGet() {
    return this.get(superAdminEndPoints.dentalGet)
  }

  dental(data: any) {
    return this.post(superAdminEndPoints.dental, data)
  }

  epsdtrsGet() {
    return this.get(superAdminEndPoints.epsdtrsGet)
  }

  epsdtrs(data: any) {
    return this.post(superAdminEndPoints.epsdtr, data)
  }

  healthMedicalGet() {
    return this.get(superAdminEndPoints.healthmedicalGet)
  }

  healthMedical(data: any) {
    return this.post(superAdminEndPoints.healthmedical, data)
  }

  safetyGet() {
    return this.get(superAdminEndPoints.safteysGet)
  }

  safety(data: any) {
    return this.post(superAdminEndPoints.saftey, data)
  }

  personalGrowthGet() {
    return this.get(superAdminEndPoints.personalGrowthGet)
  }

  personalGrowth(data: any) {
    return this.post(superAdminEndPoints.personalGrowth, data)
  }


  getTranportation() {
    return this.get(superAdminEndPoints.tranportationGet)
  }

  addTranportation(data: any) {
    return this.post(superAdminEndPoints.tranportation, data)
  }

  getWorkAndCareer() {
    return this.get(superAdminEndPoints.workAndCarrierGet)
  }

  addWorkAndCareer(data: any) {
    return this.post(superAdminEndPoints.workAndCarrier, data)
  }

  getCommunicationAndSocial() {
    return this.get(superAdminEndPoints.communicationAndsocialGet)
  }

  addCommunicationAndSocial(data: any) {
    return this.post(superAdminEndPoints.addCommunicationAndsocial, data)
  }

  getCommunication() {
    return this.get(superAdminEndPoints.communicationGet)
  }

  addCommunication(data: any) {
    return this.post(superAdminEndPoints.addCommunication, data)
  }

  getSelfHomeCare() {
    return this.get(superAdminEndPoints.selfHomeCareGet)
  }

  addSelfHomeCare(data: any) {
    return this.post(superAdminEndPoints.addSelfHomeCare, data)
  }

  getGraph() {
    return this.get(superAdminEndPoints.graphCount)
  }
  getTaskGraph() {
    return this.get(superAdminEndPoints.graphTaskCount)
  }

  postAppointment(data: any) {
    return this.post(superAdminEndPoints.addAppointment, data)
  }

  getAppointment() {
    return this.get(superAdminEndPoints.getAppointment)
  }

  postResidentNote(data: any) {
    return this.post(superAdminEndPoints.residentNote, data)
  }

  editpasswordss( data: any) {  
    return this.put(superAdminEndPoints.editpasswords, data)
  }

  postStaffDoc(data: any) {
    return this.post(superAdminEndPoints.document, data)
  }

  getStaffDocs() {
    return this.get(superAdminEndPoints.documentGet)
  }

  getRoomStatus() {
    return this.get(superAdminEndPoints.roomstatus)
  }

  getRoomTaskStatus() {
    return this.get(superAdminEndPoints.room_task_overview)
  }

  getCheck(id: any) {
    return this.get(superAdminEndPoints.checkuser + id)
  }

  getRoomTasksById(id: any): Observable<any> {
    const roomId = localStorage.getItem('roomID');
    return this.get(superAdminEndPoints.roomTasksById + roomId);
  }

  routineactivityss(data: any) {
    return this.post(superAdminEndPoints.routineactivitys, data)
  }

  dailytasks(id: any) {
    return this.get(superAdminEndPoints.dailytask + id)
  }

  getgroup() {
    return this.get(superAdminEndPoints.getgroup)
  }

  addgroup(data: any) {
    return this.post(superAdminEndPoints.getgroup, data)
  }

  updategroup(id: any, data: any) {
    return this.put(superAdminEndPoints.updategetgroup + id, data)
  }



  getBygroup(id: any) {
    return this.get(superAdminEndPoints.updategetgroup + id)
  }






  residentbymedicalprofessionals(id: any) {
    return this.get(superAdminEndPoints.residentbymedicalprofessional + id)
  }



  clientcommentss(data: any) {
    return this.post(superAdminEndPoints.clientcomments, data)
  }

  getclientcomments(id: any) {
    return this.get(superAdminEndPoints.clientcommentsbyclientid + id)
  }

  getprnmedicine() {
    return this.get(superAdminEndPoints.getprnmedicine)
  }


  addgetprnmedicine(data: any) {
    return this.post(superAdminEndPoints.getprnmedicine, data)
  }

  getCommentsByRoutineIdAndTime(routine_id: number, routine_time: string): Observable<any> {
    const url = `${superAdminEndPoints.getCommentsByRoutineIdAndTime}?routine_id=${routine_id}&routine_time=${routine_time}`;
    return this.http.get<any>(url);
  }

  postSupplier(data: any) {
    return this.post(superAdminEndPoints.supplier, data)
  }

  getPharmacy() {
    return this.get(superAdminEndPoints.supplier)
  }

  updatePharmacyStatus(id: number, status: number): Observable<any> {
    const payload = { status: status }; // Payload with the status key
    return this.http.patch(`${this.apiUrlNoty}statuschange/${id}`, payload);
  }

  // editPharmacy(id: any, updatedData: any) {
  //   return this.put(superAdminEndPoints.supplierById + id, updatedData);
  // }

  editPharmacy(id: any, updatedData: any): Observable<any> {
    const endpoint = `${superAdminEndPoints.supplierById}${id}`;
    return this.http.put(endpoint, updatedData);
  }


  pharmacyById(id: any) {
    return this.get(superAdminEndPoints.supplierById + id)
  }

  


  getbyidfamily_friendsss(id: any) {
    return this.get(superAdminEndPoints.getbyidfamily_friends + id)
  }

  addMedicineInventory(data: any) {
    return this.post(superAdminEndPoints.medicineInventory, data)
  }

  getMedicineInventory() {
    return this.get(superAdminEndPoints.medicineInventory)
  }

  getMedicineInventoryById(id: any) {
    return this.get(superAdminEndPoints.medicineInventoryById + id)
  }

  PurchaseOrder(data: any) {
    return this.post(superAdminEndPoints.purchaseOrder, data)
  }

  addfamilyandfrinedsssss(data: any) {
    return this.post(superAdminEndPoints.postfamily_friends, data)
  }



  getPurchaseOrder() {
    return this.get(superAdminEndPoints.purchaseOrder)
  }

  addPrnMedicineInventory(data: any) {
    return this.post(superAdminEndPoints.prnMedsinventory, data)
  }

  getPrnMedicineInventory() {
    return this.get(superAdminEndPoints.prnMedsinventory)
  }

  getPrnMedicineInventoryById(id: any) {
    return this.get(superAdminEndPoints.prnMedsinventoryById + id)
  }

  mailSend(data: any) {
    return this.post(superAdminEndPoints.send_mail, data)
  }

  getUserNotes() {
    return this.get(superAdminEndPoints.users_notes)
  }

  getResidentNotes() {
    return this.get(superAdminEndPoints.client_notes)
  }

  get_user_client_detail() {
    return this.get(superAdminEndPoints.getuser_client_detail)
  }

  medication_task_home() {
    return this.get(superAdminEndPoints.medication_task_home)
  }
  care_task_home() {
    return this.get(superAdminEndPoints.care_task_home)
  }

  task_by_id(id: any) {
    return this.get(superAdminEndPoints.client_taskById + id)
  }

  editClientTask(id: any, updatedData: any): Observable<any> {
    const endpoint = `${superAdminEndPoints.edit_client_task}${id}`;
    return this.http.put(endpoint, updatedData);
  }



  addMedToExpired(id: any) {
    return this.patch(superAdminEndPoints.exp_meds + id)
  }

  addMedToWaste( data: any) {
    return this.post(superAdminEndPoints.waste_meds, data)
  }

  get_waste_meds(){
    return this.get(superAdminEndPoints.get_waste_exp + 1 )
  }

  get_exp_meds(){
    return this.get(superAdminEndPoints.get_waste_exp + 2 )
  }


  addPrnMedToExpired(id: any) {
    return this.patch(superAdminEndPoints.exp_prn_meds + id)
  }

  addPrnMedToWaste(data: any) {
    return this.post(superAdminEndPoints.waste_prn_meds, data)
  }

  get__prn_waste_meds(){
    return this.get(superAdminEndPoints.get_prn_waste_exp + 1 )
  }

  get_prn_exp_meds(){
    return this.get(superAdminEndPoints.get_prn_waste_exp + 2 )
  }
  
  orderHistory(data:any){
    return this.post(superAdminEndPoints.order_history, data)
  }


  getMarReport(clientID :any) {
    // const clientID = this.getlocalstoragevalue('clientIDFaceSheet');
    return this.get(superAdminEndPoints.reportMar + clientID);
  }

  getAnnouncement(): Observable<any> {
    const userId = this.getlocalstoragevalue('userId');
    return this.get(superAdminEndPoints.announcementGet + userId);
  }

  addAnnoucement(data:any){
    return this.post(superAdminEndPoints.announcement, data)
  }

  updateAnnouncement(data:any){
    return this.put(superAdminEndPoints.announcement, data)
  }

  addAnnoucementMsg(data:any){
    return this.post(superAdminEndPoints.announcement_msg, data)
  }

  getAnnoucementMsg(id:any): Observable<any>{
    return this.get(`${this.apiUrlNoty}announcement_msg/${id}`)
  }

  addEvent(data:any){
    return this.post(superAdminEndPoints.event, data)
  }

  getEvents(){
    const userId = this.getlocalstoragevalue('userId');
    return this.get(superAdminEndPoints.eventGet + userId )
  }



  clickwindowlocation() {
    window.location.reload();
  }

}