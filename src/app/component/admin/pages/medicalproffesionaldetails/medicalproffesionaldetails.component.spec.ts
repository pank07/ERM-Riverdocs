import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalproffesionaldetailsComponent } from './medicalproffesionaldetails.component';

describe('MedicalproffesionaldetailsComponent', () => {
  let component: MedicalproffesionaldetailsComponent;
  let fixture: ComponentFixture<MedicalproffesionaldetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalproffesionaldetailsComponent]
    });
    fixture = TestBed.createComponent(MedicalproffesionaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
