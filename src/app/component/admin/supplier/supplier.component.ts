import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private api: AllService) {
    this.addForm = this.fb.group({
        pharmacy_name: ['', Validators.required], // Pharmacy name is required
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Contact must be a 10-digit number
        order_id: ['', Validators.required], // Order ID is required
        quantity: ['', [Validators.required, Validators.min(1)]], // Quantity must be at least 1
        old_quantity: [''], // Optional field, no validation
        email: ['', [Validators.required, Validators.email]], // Must be a valid email
        last_mail: [''] // Optional field, no validation
    });
}

onSubmit(): void {
  if (this.addForm.valid) {
      const formData = this.addForm.value;

      console.log('Form Submitted with:', formData);

      // Call the API to save the data
      // this.api.addPharmacyData(formData).subscribe(
      //     (response: any) => {
      //         console.log('Data Saved Successfully:', response);
      //     },
      //     (error: any) => {
      //         console.error('Error Saving Data:', error);
      //     }
      // );
  } else {
      console.error('Form is invalid:', this.addForm.errors);
  }
}

}
