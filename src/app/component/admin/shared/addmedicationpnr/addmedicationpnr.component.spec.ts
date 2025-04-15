import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicationpnrComponent } from './addmedicationpnr.component';

describe('AddmedicationpnrComponent', () => {
  let component: AddmedicationpnrComponent;
  let fixture: ComponentFixture<AddmedicationpnrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddmedicationpnrComponent]
    });
    fixture = TestBed.createComponent(AddmedicationpnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
