import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPnrComponent } from './medication-pnr.component';

describe('MedicationPnrComponent', () => {
  let component: MedicationPnrComponent;
  let fixture: ComponentFixture<MedicationPnrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationPnrComponent]
    });
    fixture = TestBed.createComponent(MedicationPnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
