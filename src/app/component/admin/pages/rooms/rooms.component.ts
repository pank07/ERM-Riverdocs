import { AfterViewInit, Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';



@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  @Input() roomUserNames!: string; // Input from parent component
  userDetails: { initials: string; fullName: string }[] = [];

  createRoomForm: FormGroup;
  updateRoomForm: FormGroup;
  residentStatusForm: FormGroup;
  residentDischargeForm: FormGroup;

  // oldResidents: any;
  oldClients: any;
  newClients: any;


  userid: any;

  constructor(private api: AllService, private fb: FormBuilder, private sweet: SweetalertssService, private router: Router) {
    const userId = localStorage.getItem('userId');

    this.userid = userId;

    this.createRoomForm = this.fb.group({
      name: new FormControl('', Validators.required),
      user_ids: new FormControl([], Validators.required),
      client_id: new FormControl([], Validators.required),
      description: new FormControl('', Validators.required),
      room_number: new FormControl('', Validators.required),
      user_id: new FormControl(this.userid, Validators.required),
    });

    this.updateRoomForm = this.fb.group({
      name: new FormControl(''),
      user_ids: new FormControl([]),
      client_id: new FormControl([]),
      description: new FormControl(''),
      room_number: new FormControl(''),
      user_id: new FormControl(this.userid),
    });

    this.residentStatusForm = this.fb.group({
      active: [1],
    });
    this.residentDischargeForm = this.fb.group({
      active: [2],
    });

    // search in 
    this.searchControl.valueChanges.subscribe((value) => {
      console.log('Search Query:', value);
    });

    this.searchControl2.valueChanges.subscribe((value) => {
      console.log('Search Query:', value);
    });
  }

  selectedUserIds: string[] = [];


  ngOnInit(): void {
    this.getRooms();
    this.getUsers();
    this.getclientss();

    this.userDetails = this.parseUserDetails(this.roomUserNames);
  }

  private parseUserDetails(userNames: string): { initials: string; fullName: string }[] {
    if (!userNames) {
      return [];
    }

    return userNames.split(',').map((name) => {
      const trimmedName = name.trim();
      const initials = trimmedName
        .split(' ')
        .filter(Boolean) // Remove empty strings if multiple spaces exist
        .map((word) => word[0].toUpperCase())
        .join('');
      return { initials, fullName: trimmedName };
    });
  }

  allRooms: any[] = [];
  getRooms() {
    this.api.getRooms().subscribe((res: any) => {
      this.allRooms = res
      this.filteredRooms = res;
    })
  }

  filteredRooms: any[] = [];
  searchText: string = '';

  filterRooms() {
    if (this.searchText.trim() === '') {
      this.filteredRooms = this.allRooms;
    } else {
      this.filteredRooms = this.allRooms.filter(room =>
        (room.name?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
        (room.room_number?.toString().includes(this.searchText) || '') ||
        (room.description?.toLowerCase().includes(this.searchText.toLowerCase()) || '')
      );
    }
  }
  


  userData: any[] = [];

  selectedUsers: any[] = [];
  selectedUsersUpdate: any[] = [];




  id: any;
  ByIdData: any = [];
  roomNo: any;
  roomNumber:any;
  roomDetails(data: any) {
    this.id = data;
    console.log("dataaaaa", this.id);

    this.api.getRoomDtls(data).subscribe((res: any) => {
      this.ByIdData = res;
      this.roomNo = res[0].id;
      this.roomNumber = res[0].room_number;
      // console.log("policy by id", this.ByIdData);
      localStorage.setItem('roomDetails', JSON.stringify(this.ByIdData));
      localStorage.setItem('roomID', JSON.stringify(this.roomNo));
      localStorage.setItem('roomNumber', JSON.stringify(this.roomNumber));
      // Store the data in the service
      this.api.setRoomData(this.ByIdData);

      // Navigate to another component (optional)
      this.router.navigate(['/Admin/room-details']);
    });
  }

  userByIdData: any = [];
  roomByID(data: any) {
    this.id = data;
    this.api.getRoomDtls(data).subscribe((res: any) => {
      this.userByIdData = res;
    })
  }



  userByIdData2: any = [];
  // roomByIDupdate(data: any) {
  //   this.id = data;
  //   this.api.getRoomDtls(data).subscribe((res: any) => {
  //     this.userByIdData2 = res[0];

  //     if (this.userByIdData2.user_ids) {
  //       const selectedUserIds = this.userByIdData2.user_ids.split(','); // Assuming user_ids is a comma-separated string
  //       this.selectedUsers = this.filteredUsers.filter((user) => selectedUserIds.includes(user.id.toString()));
  //     }
  //   })
  // }


  // updateRoom() {
  //   this.api.roomUpdate(this.id, this.userByIdData).subscribe((res: any) => {
  //     this.sweet.SucessToast(`Room Updated Successfully`);
  //     // window.location.reload()
  //   }, (error) => {
  //     console.error('Error updating user', error);
  //   });
  // }


  submitRoom() {
    const formValue = this.createRoomForm.value;

    // Ensure user_ids and client_id are arrays before joining
    const userIds = Array.isArray(formValue.user_ids) ? formValue.user_ids : formValue.user_ids.split(',');
    const clientIds = Array.isArray(formValue.client_id) ? formValue.client_id : formValue.client_id.split(',');

    const formData = {
      ...formValue,
      user_ids: userIds.join(','), // Convert user_ids array to string
      client_id: clientIds.join(','), // Convert client_id array to string
    };
    console.log(formData);

    // Post the transformed data to the API

    // this.api.postRoomData(formData).subscribe((response) => {
    //   this.sweet.SucessToast('Room created successfully')
    //   window.location.reload()
    //   console.log('Room created successfully', response);
    // });

    this.api.postRoomData(formData).subscribe(
      (response) => {
        // Assuming the response contains a client_id field
        const clientId = response?.client_id;

        if (clientId) {
          // Call updateResidentStatus with client_id
          this.updateResidentStatus(clientId);
        }

        this.sweet.SucessToast('Room created successfully');
        console.log('Room created successfully', response);

        // Reload the window only after both actions are complete
        window.location.reload();
      },
      (error) => {
        console.error('Error creating room', error);
        // Handle error here if needed
      }
    );
  }


  updateResidentStatus(clientId: string) {
    const residentStatusData = {
      ...this.residentStatusForm.value,
      id: clientId, // Pass the client_id from the response
    };

    this.api.changeResidentStatus( residentStatusData).subscribe(
      () => {
        console.log('Resident status changed successfully');
      },
      (error) => {
        console.error('Error updating resident status', error);
        // Handle error here if needed
      }
    );
  }


  filteredUsers2: any;
  filteredClients2: any;
  Updatedusers: any;
  users: any[] = []; // To hold the list of users
  clients: any[] = [];
  // This function is triggered when you load the room details for updating

  getUsers() {
    this.api.getUsersdata().subscribe((res: any) => {
      this.userData = res;
      this.users = res;
    });
  }

  getclientss() {
    this.api.getClients().subscribe((res: any) => {
      this.clientData = res;
      this.clients = res;
    });
  }

  roomByIDupdate(data: any) {
    this.id = data;
    this.api.getRoomDtls(data).subscribe((res: any) => {
      this.userByIdData2 = res[0];  // Get the room data
      // this.oldResidents = res[0].client_id;
      this.Updatedusers = res[0].user_ids;
      // console.log('old wala', this.oldResidents)
      const roomDetails = res[0];

      const roomData = res[0];
      this.updateRoomForm.patchValue({
        name: roomData.name,
        room_number: roomData.room_number,
        description: roomData.description,
        user_ids: roomData.user_ids.split(','), // Convert string to array
        client_id: roomData.client_id.split(','), // Convert string to array
      });

      // Parse user_ids and client_id into arrays
      const userIds = roomDetails.user_ids ? roomDetails.user_ids.split(',') : [];


      this.oldClients = roomDetails.client_id;
      console.log('old client', this.oldClients);



      const clientIds = roomDetails.client_id ? roomDetails.client_id.split(',') : []; // client_id is a single ID

      // Debugging the parsed IDs
      console.log('userIds:', userIds);
      console.log('clientIds old:', clientIds);

      // this.selectedUsersUpdate = userIds
      // this.selectedClientsUpdate = clientIds

      //  Ensure users and clients are available before filtering
      if (this.users && this.users.length > 0) {
        console.log('All users:', this.users);
        this.selectedUsersUpdate = this.users.filter((user: any) =>
          userIds.includes(user.id.toString())
        );
      }

      if (this.clients && this.clients.length > 0) {
        console.log('All clients:', this.clients);
        this.selectedClientsUpdate = this.clients.filter((client: any) =>
          clientIds.includes(client.id.toString())
        );
      }

      // Debugging the selected results
      console.log('Selected Users:', this.selectedUsersUpdate);
      console.log('Selected Clients:', this.selectedClientsUpdate);
    });
  }

  // toggleSelectionUpdate(user: any): void {
  //   const userIdsControl = this.updateRoomForm.get('user_ids');

  //   const index = this.selectedUsersUpdate.findIndex((u) => u.id === user.id);

  //   if (index > -1) {
  //     // If the user is already selected, remove them
  //     this.selectedUsersUpdate.splice(index, 1);
  //   } else {
  //     // Add the user to the selection
  //     this.selectedUsersUpdate.push(user);
  //   }

  //   // Update the user_ids form control with the selected user IDs
  //   userIdsControl?.setValue(this.selectedUsersUpdate.map((u) => u.id));
  // }

  toggleSelectionUpdate(user: any) {
    // const index = this.selectedUsersUpdate.findIndex((selected) => selected.id === user.id);
    // if (index > -1) {
    //   this.selectedUsersUpdate.splice(index, 1); // Remove user if already selected
    // } else {
    //   this.selectedUsersUpdate.push(user); // Add user to selected list
    // }
    const userIds = this.updateRoomForm.get('user_ids')?.value || [];
    if (userIds.includes(user.id.toString())) {
      const updatedUserIds = userIds.filter((id: string) => id !== user.id.toString());
      this.updateRoomForm.patchValue({
        user_ids: updatedUserIds,
      });

      const index = this.selectedUsersUpdate.findIndex((u: any) => u.id === user.id);
      if (index !== -1) {
        this.selectedUsersUpdate.splice(index, 1);
      }
    } else {
      this.updateRoomForm.patchValue({
        user_ids: [...userIds, user.id.toString()],
      });
      this.selectedUsersUpdate.push(user);
    }

    console.log('Updated User IDs:', this.updateRoomForm.get('user_ids')?.value);
  }

  isUserSelectedUpdate(user: any): boolean {
    return this.selectedUsersUpdate.some((selected) => selected.id === user.id);
  }

  // updateusers() {

  //   const formValue = this.updateRoomForm.value;

  //   // Ensure user_ids and client_id are arrays before joining
  //   const userIds = Array.isArray(formValue.user_ids) ? formValue.user_ids : formValue.user_ids.split(',');
  //   const clientIds = Array.isArray(formValue.client_id) ? formValue.client_id : formValue.client_id.split(',');

  //   const formData = {
  //     ...formValue,
  //     user_ids: userIds.join(','), // Convert user_ids array to string
  //     client_id: clientIds.join(','), // Convert client_id array to string
  //   };
  //   console.log(formData);
  //   this.newResidents = formData.user_ids;


  //   // Post the transformed data to the API

  //   const newResidents = this.newResidents;
  //   const oldResidents = this.oldResidents;
  //   // Find removed IDs (in oldResidents but not in newResidents)
  //   const removedIds = oldResidents.filter((id: any) => !newResidents.includes(id));
  //   console.log('Removed IDs:', removedIds);

  //   // Find added IDs (in newResidents but not in oldResidents)
  //   const addedIds = newResidents.filter((id: any) => !oldResidents.includes(id));
  //   console.log('Added IDs:', addedIds);

  //   console.log(formData)

  //   // this.api.roomUpdate(this.id, formData).subscribe((response) => {
  //   //   this.sweet.SucessToast('Room edited successfully')
  //   //   window.location.reload()
  //   //   console.log('Room created successfully', response);
  //   // });

  // }

  updateusers() {
    const formValue = this.updateRoomForm.value;

    // Debugging current form values
    console.log('Form Value:', formValue);

    // Ensure user_ids and client_id are arrays before joining
    const userIds = Array.isArray(formValue.user_ids)
      ? formValue.user_ids
      : formValue.user_ids.split(',');
    const clientIds = Array.isArray(formValue.client_id)
      ? formValue.client_id
      : formValue.client_id.split(',');


    // Construct formData with current and previous selections
    const formData = {
      ...formValue,
      user_ids: userIds.join(','), // Current user_ids as string
      client_id: clientIds.join(','), // Current client_id as string
      // previous_user_ids: oldResidents.join(','), // Previous user_ids
      // previous_client_ids: oldClients.join(','), // Previous client_ids
    };


    this.newClients = formData.client_id;


    // Debugging the constructed form data
    console.log('Form Data:', formData);
    console.log('new client:', this.newClients);

    // Post the transformed data to the API
    this.api.roomUpdate(this.id, formData).subscribe((response) => {
      this.sweet.SucessToast('Room edited successfully');
      console.log('Room updated successfully:', response);

      if (response.status == 200) {
        const oldClientArray = this.oldClients.split(',').map((item: any) => item.trim());
        const newClientArray = this.newClients.split(',').map((item: any) => item.trim());

        // Find added clients
        const addedClients = newClientArray.filter((client: any) => !oldClientArray.includes(client));

        // Find removed clients
        const removedClients = oldClientArray.filter((client: any) => !newClientArray.includes(client));

        console.log('Added Clientsarr:', addedClients[0]); // ['4']
        console.log('Removed Clientsarr:', removedClients[0]); // ['1']
        console.log('Added Clients:', addedClients); // ['4']
        console.log('Removed Clients:', removedClients); // ['1']

        if (addedClients && addedClients.length  > 0 ) {
          this.updateResidentStatus(addedClients[0]);
        }

        if (removedClients && removedClients.length > 0 ) {
          this.updateResidentStatus2(removedClients[0]);
        }
        
      }

      window.location.reload();
    });

  }


  updateResidentStatus2(clientId: string) {
    const residentStatusData = {
      ...this.residentDischargeForm.value,
      id: clientId, // Pass the client_id from the response
    };
  
    this.api.changeResidentStatus( residentStatusData).subscribe(
      () => {
        console.log('Resident status changed successfully');
      },
      (error) => {
        console.error('Error updating resident status', error);
        // Handle error here if needed
      }
    );
  }


  roomDelete(itemDlt: any): void {
    this.api.deleteRoom(itemDlt.id).subscribe(
      () => {
        window.location.reload()
      },
      (error) => {
        console.error('Error deleting room', error);
      }
    );
  }


  toggleSelection(user: any): void {
    const userIdsControl = this.createRoomForm.get('user_ids');

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

  // searchControl = new FormControl('');
  searchControl = this.fb.control('');
  searchControl2 = this.fb.control('');

  // In the component class
  selectedClients: any[] = []; // To store selected clients
  selectedClientsUpdate: any[] = []; // To store selected clients
  clientData: any[] = []; // Replace with your API response for clients
  searchQuery: string = '';

  // get filteredUsers() {
  //   if (!this.searchQuery) {
  //     return this.userData;
  //   }
  //   const query = this.searchQuery.toLowerCase();
  //   // return this.userData.filter(
  //   //   (user) =>
  //   //     user.first_name.toLowerCase().includes(query) ||
  //   //     user.last_name.toLowerCase().includes(query)
  //   // );

  //   const filtered = this.userData.filter(
  //     (user) =>
  //       user.first_name.toLowerCase().includes(query) ||
  //       user.last_name.toLowerCase().includes(query)
  //   );

  //   console.log('Search query:', this.searchQuery);
  //   console.log('Filtered users:', filtered);

  //   return filtered;
  // }

  get filteredUsers() {
    const query = this.searchControl.value?.toLowerCase() || '';
    return this.userData.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query)
    );
  }

  get filteredClients() {
    const query = this.searchControl2.value?.toLowerCase() || '';
    return this.clientData.filter(
      (client) =>
        client.first_name.toLowerCase().includes(query) ||
        client.last_name.toLowerCase().includes(query)
    );
  }

  toggleSelectionClient(client: any): void {
    const clientIdsControl = this.createRoomForm.get('client_id');

    const index = this.selectedClients.findIndex((c) => c.id === client.id);

    if (index > -1) {
      // If the client is already selected, remove them
      this.selectedClients.splice(index, 1);
    } else {
      // Add the client to the selection
      this.selectedClients.push(client);
    }

    // Update the client_id form control with a comma-separated string of client IDs
    const clientIdsString = this.selectedClients.map((c) => c.id).join(',');
    clientIdsControl?.setValue(clientIdsString);
  }

  isClientSelected(client: any): boolean {
    // Check if the client is in the selectedClients array
    return this.selectedClients.some((c) => c.id === client.id);
  }

  // toggleSelectionClientUpdate(client: any): void {
  //   const clientIdsControl = this.updateRoomForm.get('client_id');

  //   const index = this.selectedClientsUpdate.findIndex((c) => c.id === client.id);

  //   if (index > -1) {
  //     // If the client is already selected, remove them
  //     this.selectedClientsUpdate.splice(index, 1);
  //   } else {
  //     // Add the client to the selection
  //     this.selectedClientsUpdate.push(client);
  //   }

  //   // Update the client_id form control with a comma-separated string of client IDs
  //   const clientIdsString = this.selectedClientsUpdate.map((c) => c.id).join(',');
  //   clientIdsControl?.setValue(clientIdsString);
  // }

  // isClientSelectedUpdate(client: any): boolean {
  //   // Check if the client is in the selectedClients array
  //   return this.selectedClientsUpdate.some((c) => c.id === client.id);
  // }

  toggleSelectionClientUpdate(client: any): void {
    // const index = this.selectedClientsUpdate.findIndex((selected) => selected.id === client.id);
    // if (index > -1) {
    //   this.selectedClientsUpdate.splice(index, 1); // Remove client if already selected
    // } else {
    //   this.selectedClientsUpdate.push(client); // Add client to selected list
    // }

    const clientIds = this.updateRoomForm.get('client_id')?.value || [];
    if (clientIds.includes(client.id.toString())) {
      const updatedClientIds = clientIds.filter((id: string) => id !== client.id.toString());
      this.updateRoomForm.patchValue({
        client_id: updatedClientIds
      });

      const index = this.selectedClientsUpdate.findIndex((u: any) => u.id === client.id);
      if (index !== -1) {
        this.selectedClientsUpdate.splice(index, 1);
      }
    } else {
      this.updateRoomForm.patchValue({
        client_id: [...clientIds, client.id.toString()],
      });
      this.selectedClientsUpdate.push(client);
    }
  }


  isClientSelectedUpdate(client: any): boolean {
    return this.selectedClientsUpdate.some((selected) => selected.id === client.id);
  }






  // userDetails: { [key: string]: { first_name: string; last_name: string } } = {};

  // fetchUserDetails(userId: string) {
  //   // Check if user details are already fetched
  //   if (!this.userDetails[userId]) {
  //     this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
  //       // Assuming the API returns an array with one object
  //       const user = data[0]; // Access the first object in the array
  //       this.userDetails[userId] = {
  //         first_name: user.first_name,
  //         last_name: user.last_name
  //       };
  //     });
  //   }
  // }

  // fetchUserDetails(userId: string) {
  //   // Check if user details are already fetched
  //   if (!this.userDetails[userId]) {
  //     this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
  //       // Assuming the API returns an array with one object
  //       const user = data[0]; // Access the first object in the array
  //       this.userDetails[userId] = {
  //         first_name: user.first_name,
  //         last_name: user.last_name
  //       };
  //     });
  //   }
  // }


  // fetchClientDetails(userId: string) {
  //   // Check if user details are already fetched
  //   if (!this.userDetails[userId]) {
  //     this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
  //       // Assuming the API returns an array with one object
  //       const user = data[0]; // Access the first object in the array
  //       this.userDetails[userId] = {
  //         first_name: user.first_name,
  //         last_name: user.last_name
  //       };
  //     });
  //   }
  // }

  // getInitials(userId: string): string {
  //   const user = this.userDetails[userId];
  //   if (user) {
  //     const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
  //     const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
  //     return firstInitial || lastInitial ? `${firstInitial}${lastInitial}` : 'U';
  //   }
  //   return 'View'; // Default to 'U' while loading
  // }

  getUserDetails2(userNames: string): { initials: string; fullName: string }[] {
    return userNames.split(',').map(name => {
      const trimmedName = name.trim();
      const initials = trimmedName
        .split(' ')
        .map(word => word[0].toUpperCase())
        .join('');
      return { initials, fullName: trimmedName };
    });
  }

  isPopoverVisible: boolean = false;

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  closePopover() {
    this.isPopoverVisible = false;
  }

  userprofile() {
    this.router.navigate(['/Admin/Userdetails'])
  }

  clientprofile() {
    this.router.navigate(['/Admin/Clientdetails'])
  }

  client_idss: any;
  userByIdDatas: any = [];
  ByIds(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.api.getuserById(data).subscribe((res: any) => {
      this.userByIdDatas = [res[0]];
      this.client_idss = res[0].id
      localStorage.setItem('clientdetails', JSON.stringify(this.userByIdDatas));
      localStorage.setItem('clientid', JSON.stringify(data));

      this.userprofile();

      this.api.setclientData(this.userByIdDatas);
      console.log("policy by id", this.userByIdDatas)
    })
  }

  ByIds2(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.api.getuserById(data).subscribe((res: any) => {
      this.userByIdDatas = [res[0]];
      this.client_idss = res[0].id
      localStorage.setItem('clientdetails', JSON.stringify(this.userByIdDatas));
      localStorage.setItem('clientid', JSON.stringify(data));

      this.clientprofile();

      this.api.setclientData(this.userByIdDatas);
      console.log("policy by id", this.userByIdDatas)
    })
  }


}
