import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrnInventoryComponent } from './prn-inventory.component';

describe('PrnInventoryComponent', () => {
  let component: PrnInventoryComponent;
  let fixture: ComponentFixture<PrnInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrnInventoryComponent]
    });
    fixture = TestBed.createComponent(PrnInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
