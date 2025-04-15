import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedOrderComponent } from './purchased-order.component';

describe('PurchasedOrderComponent', () => {
  let component: PurchasedOrderComponent;
  let fixture: ComponentFixture<PurchasedOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasedOrderComponent]
    });
    fixture = TestBed.createComponent(PurchasedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
