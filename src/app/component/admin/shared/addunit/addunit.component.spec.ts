import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunitComponent } from './addunit.component';

describe('AddunitComponent', () => {
  let component: AddunitComponent;
  let fixture: ComponentFixture<AddunitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddunitComponent]
    });
    fixture = TestBed.createComponent(AddunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
