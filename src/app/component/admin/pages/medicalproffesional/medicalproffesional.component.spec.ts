import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalproffesionalComponent } from './medicalproffesional.component';

describe('MedicalproffesionalComponent', () => {
  let component: MedicalproffesionalComponent;
  let fixture: ComponentFixture<MedicalproffesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalproffesionalComponent]
    });
    fixture = TestBed.createComponent(MedicalproffesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
