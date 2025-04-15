import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicalproffesionalComponent } from './addmedicalproffesional.component';

describe('AddmedicalproffesionalComponent', () => {
  let component: AddmedicalproffesionalComponent;
  let fixture: ComponentFixture<AddmedicalproffesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddmedicalproffesionalComponent]
    });
    fixture = TestBed.createComponent(AddmedicalproffesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
