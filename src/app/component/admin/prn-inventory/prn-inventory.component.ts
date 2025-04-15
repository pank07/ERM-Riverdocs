import { Component, OnInit,ChangeDetectorRef,NgZone   } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { window } from 'rxjs';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-prn-inventory',
  templateUrl: './prn-inventory.component.html',
  styleUrls: ['./prn-inventory.component.css']
})
export class PrnInventoryComponent implements OnInit {
  inventoryMedicineForm: FormGroup;
  purchaseMedicineForm: FormGroup;
  expiredMedForm: FormGroup;
  wasteMedForm: FormGroup;

  constructor(private fb: FormBuilder, private api: AllService,private router:Router,private cdRef: ChangeDetectorRef,private zone: NgZone) {
    this.inventoryMedicineForm = this.fb.group({
      medicine_id: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      supplier_id: ['', Validators.required],
      record_level: ['', Validators.required],
      Status:['1'],
      mfg_date:['',Validators.required],
      exp_date:['',Validators.required],
    });

    this.purchaseMedicineForm = this.fb.group({
      order_id:[''], // generated
      quantity:[''], // text form
      pharmacy_id:[''], // show name send id
      meds_id:[''], // show name send id
      purchase_status:[1],
      order_type:['prn'],
      inventory_id:[''],
    });

    this.expiredMedForm = this.fb.group({
      exp_count:[''],
    });

    this.wasteMedForm = this.fb.group({
      medicine_id:[''],
      waste_count:[''],
      medicine_name:[''],
      Status:['4'],
      mfg_date:[''],
      exp_date:[''],
    });
  }

  selectedMedId: string | null = null;

  expiredMEds(id:any){
    console.log('expired form',id,this.expiredMedForm.value);
    this.api.addPrnMedToExpired( id ).subscribe((res:any)=>{
      this.api.clickwindowlocation();
    })
  }

  selectedWasteMedId: string | null = null;

  wasteMEds(){
    console.log('waste form',this.wasteMedForm.value);
    this.api.addPrnMedToWaste(  this.wasteMedForm.value).subscribe((res:any)=>{
      this.api.clickwindowlocation();
    })
  }

  setModalData(mt: any) {
    this.wasteMedForm.patchValue({
      medicine_id: mt.medicine_id,
      medicine_name: mt.medicine_name,
      mfg_date: mt.mfg_date,
      exp_date: mt.exp_date,
    });
  }

  ngOnInit(): void {
    this.getMeds();
    this.getPharmacyData();
    this.getInventoryData();
    this.generateOrderId();
    this.getWasteMeds();
    this.getExpMeds();
  }

  allWasteData:any;
  getWasteMeds(){
    this.api.get__prn_waste_meds().subscribe((res:any)=>{
      this.allWasteData = res;
    })
  }

  allExpData:any;
  getExpMeds(){
    this.api.get_prn_exp_meds().subscribe((res:any)=>{
      this.allExpData = res;
    })
  }


  order:any
  generateOrderId(): void {
    const timestamp = new Date().getTime(); // Use timestamp for uniqueness
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const orderId = `${timestamp}-${randomPart}`; // Example format: ORD-1234567890123-5678

    console.log( 'order id', orderId);

    this.order = orderId
    
    // Auto-fill the order_id field
    this.purchaseMedicineForm.patchValue({
        order_id: orderId
    });
}



purchaseMeds(){
  this.api.PurchaseOrder(this.purchaseMedicineForm.value).subscribe((res:any)=>{
    this.api.clickwindowlocation();
  })
  console.log(this.purchaseMedicineForm.value);
}

  allMeds: any[] = [];

  getMeds() {
    this.api.getprnmedicine().subscribe((res: any) => {
      this.allMeds = res
    })
  }



  pharmaData: any[]=[];
  getPharmacyData(){
    this.api.getPharmacy().subscribe((res:any)=>{
      this.pharmaData = res
    })
  }

  medsInventoryData: any[]=[];
  getInventoryData(){
    this.api.getPrnMedicineInventory().subscribe((res:any)=>{
      this.medsInventoryData = res;
      this.filteredData = this.medsInventoryData; 
    })
  }

  filteredData: any[] = [];
  filterKeys: { pharmacy_name?: string; medsname?: string; startDate?: Date; endDate?: Date } = {};
  filterData() {
    const { startDate, endDate } = this.filterKeys;
  
    this.filteredData = this.medsInventoryData.filter((purchase:any) => {
      let matches = true;
  
      // Check for last_order_date and created_at within the date range
      if (startDate) {
        matches = matches && (
          (new Date(purchase.last_order_date) >= new Date(startDate)) || 
          (new Date(purchase.created_at) >= new Date(startDate))
        );
      }
  
      if (endDate) {
        matches = matches && (
          (new Date(purchase.last_order_date) <= new Date(endDate)) || 
          (new Date(purchase.created_at) <= new Date(endDate))
        );
      }
  
      return matches;
    });
  }

  id:any;
  byIdData:any;
  ByIdfunc(data: any) {
    this.generateOrderId();
    this.id = data;
    this.api.getPrnMedicineInventoryById(data).subscribe((res: any) => {
      this.byIdData = res; // Assuming 'res' is the object for the specific menu item
    });
  }


  selectedMedicine: string = '';


  onMedicineSelect(event: Event): void {
    const selectedValue = this.inventoryMedicineForm.get('medicine_id')?.value;

    if (selectedValue) {
        const [id, name] = selectedValue.split(':');

        if (id && name) {
            console.log('Selected Medicine:', { id: +id, name: name.trim() });
        } else {
            console.error('Invalid selection format:', selectedValue);
        }
    } else {
        console.error('No medicine selected.');
    }
}

// Handle form submission
onSubmit(): void {
    if (this.inventoryMedicineForm.valid) {
        const formData = this.inventoryMedicineForm.value;
        const [id, name] = formData.medicine_id.split(':');

        const payload = {
            medicine_id: +id,
            medicine_name: name.trim(),
            quantity: formData.quantity,
            supplier_id: formData.supplier_id,
            record_level: formData.record_level,
            Status: formData.Status,
            mfg_date: formData.mfg_date,
            exp_date: formData.exp_date,
        };

        console.log('Form Submitted with:', payload);

        // Perform an API call with the form data
        this.api.addPrnMedicineInventory(payload).subscribe(
            (response: any) => {
                console.log('Medicine Inventory Added Successfully:', response);
                this.api.clickwindowlocation();
            },
            (error: any) => {
                console.error('Error Adding Medicine Inventory:', error);
            }
        );
    } else {
        console.error('Form is invalid:', this.inventoryMedicineForm.errors);
    }
}

}