import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit{
  addForm!: FormGroup;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private api: AllService) {
    this.addForm = this.fb.group({
        pharmacy_name: ['', Validators.required], // Pharmacy name is required
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
        // quantity: ['', [Validators.required, Validators.min(1)]], // Quantity must be at least 1
        email: ['', [Validators.required, Validators.email]], // Must be a valid email
    });

    this.editForm = this.fb.group({
      id: [''],
      pharmacy_name: [''],
      contact: [''],
      // quantity: [''],
      email: [''],
    });
}
  ngOnInit(): void {
    this.generateOrderId(); 
  this.getPharmacyData();
  }

  allData: any[]=[];
  getPharmacyData(){
    this.api.getPharmacy().subscribe((res:any)=>{
      this.allData = res
    })
  }

  viewDetails(pharmacy: any): void {
    // Implement navigation or details view functionality here
    console.log('View details for:', pharmacy);
  }

  order:any
  generateOrderId(): void {
    const timestamp = new Date().getTime(); // Use timestamp for uniqueness
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const orderId = `ORD-${timestamp}-${randomPart}`; // Example format: ORD-1234567890123-5678

    console.log( 'order id', orderId);

    this.order = orderId
    
    // Auto-fill the `order_id` field
    this.addForm.patchValue({
        order_id: orderId
    });
}

onSubmit(): void {
  if (this.addForm.valid) {
      const formData = this.addForm.value;

      console.log('Form Submitted with:', formData);

      // Call the API to save the data
      this.api.postSupplier(formData).subscribe(
          (response: any) => {
              console.log('Data Saved Successfully:', response);
              window.location.reload();
          },
          (error: any) => {
              console.error('Error Saving Data:', error);
          }
      );
  } else {
      console.error('Form is invalid:', this.addForm.errors);
  }
}

dataById:any;
tempData:any;
editData:any;
// Component (TypeScript)
byId(id: any): void {
  console.log('byId called with ID:', id);
  this.tempData = id;
  if (!id) {
    console.error('Error: ID is undefined in byId');
    return;
  }

  
  this.api.pharmacyById(id).subscribe(
    (res: any) => {
      console.log('API Response:', res);
      this.dataById = res;

      this.editForm.patchValue({
        id: res.id,
        pharmacy_name: res.pharmacy_name,
        contact: res.contact,
        order_id: res.order_id,
        quantity: res.quantity,
        email: res.email,
      });
    },
    (err: any) => {
      console.error('Error fetching data:', err);
    }
  );
}

saveChanges(): void {
  const updatedData = this.editForm.value;
  const id = updatedData.id;

  console.log('saveChanges called with ID:', this.tempData);
  if (!this.tempData) {
    console.error('Error: ID is undefined in saveChanges');
    return;
  }

  this.api.editPharmacy(this.tempData, updatedData).subscribe(
    (res: any) => {
      console.log('Successfully updated pharmacy:', res);
      this.api.clickwindowlocation();
    },
    (err: any) => {
      console.error('Error during update:', err);
    }
  );
}


toggleStatus(pharmacy: any): void {
  const newStatus = pharmacy.status === 1 ? 0 : 1; // Toggle between 1 (active) and 0 (inactive)

  this.api.updatePharmacyStatus(pharmacy.id, newStatus).subscribe(
    (response) => {
      // Update the status locally after successful API call
      pharmacy.status = newStatus;
      window.location.reload();
    },
    (error) => {
      console.error('Error updating pharmacy status:', error);
    }
  );
}
}
