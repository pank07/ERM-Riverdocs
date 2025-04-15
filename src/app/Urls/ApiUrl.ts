// const baseUrl = 'https://alora-yst7j.ondigitalocean.app/api/v1/';
// const baseUrl = 'https://alora-plus.vercel.app/api/v1/';
// const baseUrl = 'http://192.168.1.231:5000/';
import { environment } from "src/environments/environment";

const baseUrl = environment.mainapi;

export const superAdminEndPoints = {
    superAdminLogin: `${baseUrl}login`,
    createusers: `${baseUrl}createuser`,
    getsidebar: `${baseUrl}sidebars`,
    getUSerPermission: `${baseUrl}user_permission/`,
    postUSerPermission: `${baseUrl}user_permission`,
    SidebarByID: `${baseUrl}sidebar_details/`,
    SidebarByIDs: `${baseUrl}sidebarbyid/`,
    editpasswords: `${baseUrl}editpassword`,
    editunitByid: `${baseUrl}unit/`,
    GetByunitByid: `${baseUrl}unit/`,
    GetBymedicine_details: `${baseUrl}medicine_details/`,
    GetBypnrmedicine_details: `${baseUrl}prnmedicine_details/`,
    //:id
    editGetBymedicine: `${baseUrl}medicine/`,
    editpnrmedicine: `${baseUrl}prnmedicine/`,


    SubSidebarByID: `${baseUrl}subsidebar_details/`,
    updateSidebar: `${baseUrl}sidebar`,
    getSubMenu: `${baseUrl}subsidebars`,
    getUsers: `${baseUrl}users`,
    getRoomUsers: `${baseUrl}users/`,
    getRoomClients: `${baseUrl}clients/`,
    getclients: `${baseUrl}client`,
    getproffesional: `${baseUrl}medical_professional`,
    getClientss: `${baseUrl}client`,
    createclient: `${baseUrl}createclient`,
    routines: `${baseUrl}routine`,
    medicineinventoryadd: `${baseUrl}medicine_inventory_updateuserid/`,
   
 

    notes: `${baseUrl}note`,
    roomnotes: `${baseUrl}roomnotes`,

    addTask: `${baseUrl}task`,
    roomTaksAdd: `${baseUrl}roomtask`,
    addRoomTask: `${baseUrl}roomtask`,
    addstatus: `${baseUrl}status`,
    getmedicine: `${baseUrl}medicine`,
    gertmilestones: `${baseUrl}milestone_details`,
    gertmilestonesBYClientId: `${baseUrl}milestone_details/`,
    createmilestoness: `${baseUrl}createmilestone`,
    rooms: `${baseUrl}room`,
    roomsDelete: `${baseUrl}room/`,
    roomUpdate: `${baseUrl}editroom/`,
    createRooms: `${baseUrl}createroom`,
    getUsersByid: `${baseUrl}users_details/`,
    Usersupdate: `${baseUrl}editUser/`,

    updatemedicalprofessional  : `${baseUrl}medical_professional/`,
    Userstatusupdate: `${baseUrl}activateUser/`,
    InstatusStatusupdate: `${baseUrl}statusupdate/`,
    statusUpdtedGetById: `${baseUrl}status_details/`,
    statusUpdtedput: `${baseUrl}status/`,
    allactiveststus: `${baseUrl}activestatus`,
    frequencys: `${baseUrl}frequency`,
    uinitsdatas: `${baseUrl}unit`,
    uinitsdataspost: `${baseUrl}unit`,
    postfacesheetbasicinfo: `${baseUrl}facesheet_basicinfo`,
    postfacesheetfacilityinfo: `${baseUrl}facesheet_facility_info`,
    postfacesheetmedicalservice: `${baseUrl}facesheet_medical_service`,
    postfacesheet_insurance: `${baseUrl}facesheet_insurance`,
    getbyidfacesheet_insurance: `${baseUrl}facesheet_insurance/`,
    postfacesheet_diagnoses : `${baseUrl}facesheet_diagnoses `,
    postmedicalhistoryssss:`${baseUrl}medical_history`,
     
    getbyidmedical_history: `${baseUrl}medical_history/`,

    postfacesheet_allergies   : `${baseUrl}facesheet_allergies`,
    getbyidfacesheet_allergies   : `${baseUrl}facesheet_allergies/`,

    getbyidfacesheet_diagnoses : `${baseUrl}facesheet_diagnoses/`,

 

  
    
    

    facesheet_basicinfo_details: `${baseUrl}facesheet_basicinfo_details/`,
    facesheet_facility_info_details: `${baseUrl}facesheet_facility_info_details/`,
    facesheet_medical_service_details: `${baseUrl}facesheet_medical_service_details/`,

    putacesheetgetbyidesssslatest: `${baseUrl}facesheet_basicinfo/`,
    facesheetgetbyidesssslatest: `${baseUrl}facesheet/`,
    postfamily_friends  : `${baseUrl}family_friends`,
    getbyidfamily_friends : `${baseUrl}family_friends/`,
  


    finalfacesheet: `${baseUrl}facesheet/`,

    
    changeResidentStatus: `${baseUrl}roomactivateUser`,
    postfacesheet: `${baseUrl}facesheet`,
    facesheetgetbyis: `${baseUrl}facesheet/`,

    userroomnotesdetailss: `${baseUrl}userroomnotesdetails/`,

    taskbyuserids :`${baseUrl}taskbyuserid/`,

    // timesdata: `${baseUrl}times`,

    clientstatusupdatess: `${baseUrl}activateUser/`,
    getLanguagess: `${baseUrl}get_language`,
    changeLanguage: `${baseUrl}change_language?lang=`,
    userDetailsForRoom: `${baseUrl}userdata/`,
    roomDetails: `${baseUrl}room_details/`,
    comment: `${baseUrl}comment/`,
    postComment: `${baseUrl}comment`,
    mainLogo: `${baseUrl}mainlogosetting/`,
    loginLogo: `${baseUrl}loginlogosetting/`,
    faviLogo: `${baseUrl}faviconsetting/`,
    logoGet: `${baseUrl}setting`,
    roomactivity: `${baseUrl}roomactivity`,
    commentactivity: `${baseUrl}commentactivity`,
    medicineactivity: `${baseUrl}medicineactivity`,
    milestoneactivity: `${baseUrl}milestoneactivity`,
    taskactivity: `${baseUrl}taskactivity`,
    statusactivity: `${baseUrl}statusactivity`,
    settingactivity: `${baseUrl}settingactivity`,
    sidebarpermissionByid: `${baseUrl}sidebarpermission`,
    groupidchangeByid: `${baseUrl}users_group/`,
    groupidchangeByidss: `${baseUrl}permissionbygroupid/`,
    permissiongroupss: `${baseUrl}permission`,
    


   



    //1
    unitactivity: `${baseUrl}unitactivity`,
    frequencyactivity: `${baseUrl}frequencyactivity`,


    tranportationGet: `${baseUrl}transportations`,
    tranportation: `${baseUrl}transportation`,
    workAndCarrierGet: `${baseUrl}workandcareerandeducations`,
    workAndCarrier: `${baseUrl}workandcareerandeducation`,
    communicationAndsocialGet: `${baseUrl}communicationandsociainvolvements`,
    addCommunicationAndsocial: `${baseUrl}communicationandsociainvolvement`,
    communicationGet: `${baseUrl}communications`,
    addCommunication: `${baseUrl}communication`,
    selfHomeCareGet: `${baseUrl}selfhomecares`,
    addSelfHomeCare: `${baseUrl}selfhomecare`,
    currentMedicationGet: `${baseUrl}currentmedications`,
    currentMedication: `${baseUrl}currentmedication`,
    dental: `${baseUrl}dental`,
    dentalGet: `${baseUrl}dentals`,
    epsdtr: `${baseUrl}epsdtr`,
    epsdtrsGet: `${baseUrl}epsdtrs`,
    healthmedical: `${baseUrl}healthmedical`,
    healthmedicalGet: `${baseUrl}healthmedicals`,
    saftey: `${baseUrl}saftey`,
    safteysGet: `${baseUrl}safteys`,
    personalGrowth: `${baseUrl}personalandemotinalgrowth`,
    personalGrowthGet: `${baseUrl}personalandemotinalgrowths`,
    currentProviderAdd: `${baseUrl}currentprovider`,
    currentProviderGet: `${baseUrl}currentproviders`,
    graphCount: `${baseUrl}rooms_overview`,
    graphTaskCount: `${baseUrl}task_overview`,
    getNotification:`${baseUrl}notification_details/`,
    addAppointment:`${baseUrl}appoitment`,
    getAppointment:`${baseUrl}appoitments`,
    Theme:`${baseUrl}themes`,
    notification:`${baseUrl}notification_details/`,
    residentNote:`${baseUrl}note`,
    document: `${baseUrl}document`,
    documentGet: `${baseUrl}document/`,
    roomstatus: `${baseUrl}roomstatus`,
    room_task_overview: `${baseUrl}room_task_overview`,
    checkuser: `${baseUrl}checkuser/`,
    roomTasksById: `${baseUrl}taskbyroomid/`,
    routineactivitys: `${baseUrl}routineactivity`,
    dailytask: `${baseUrl}dailytask/`,

    residentbymedicalprofessional: `${baseUrl}residentbymedical_professional_id/`,
    clientcomments: `${baseUrl}clientcomment`,
    clientcommentsbyclientid: `${baseUrl}clientcomment/`,

    getgroup: `${baseUrl}group`,
    updategetgroup: `${baseUrl}group/`,
    getprnmedicine: `${baseUrl}prnmedicine`,
    getCommentsByRoutineIdAndTime: `${baseUrl}clientcommenbyroutineidandtime`,
    supplier: `${baseUrl}pharmacy`,
    supplierById: `${baseUrl}pharmacy/`,
    medicineInventory: `${baseUrl}medicine_inventory`,
    medicineInventoryById: `${baseUrl}medicine_inventory/?id=`,
    purchaseOrder : `${baseUrl}purchase_order`,
    prnMedsinventory : `${baseUrl}prnmedicine_inventory`,
    prnMedsinventoryById : `${baseUrl}prnmedicine_inventory/?id=`,
    send_mail: `${baseUrl}send_mail`,

    users_notes: `${baseUrl}users_notes`,
    client_notes: `${baseUrl}client_notes`,

    getuser_client_detail:`${baseUrl}user_client_details_task`,
    medication_task_home: `${baseUrl}task_type/medication task`,
    care_task_home: `${baseUrl}task_type/care task`,
    edit_client_task: `${baseUrl}editask/`,
    client_taskById: `${baseUrl}task_details/`,

    exp_meds: `${baseUrl}exp_meds/`,
    waste_meds: `${baseUrl}waste_meds`,
    get_waste_exp: `${baseUrl}waste_exp/`,

    exp_prn_meds: `${baseUrl}exp_prnmeds/`,
    waste_prn_meds: `${baseUrl}waste_prnmeds`,
    get_prn_waste_exp: `${baseUrl}prn_waste_exp/`,
    order_history: `${baseUrl}order_history`,

    reportMar:` ${baseUrl}reportmar/`,
    announcementGet: `${baseUrl}announcement/`,
    announcement: `${baseUrl}announcement`,
    announcement_msg: `${baseUrl}announcement_msg`,
    event: `${baseUrl}events`,
    eventGet: `${baseUrl}events/`,

}