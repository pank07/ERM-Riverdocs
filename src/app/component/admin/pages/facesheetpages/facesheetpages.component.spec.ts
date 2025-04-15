import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacesheetpagesComponent } from './facesheetpages.component';

describe('FacesheetpagesComponent', () => {
  let component: FacesheetpagesComponent;
  let fixture: ComponentFixture<FacesheetpagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacesheetpagesComponent]
    });
    fixture = TestBed.createComponent(FacesheetpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
