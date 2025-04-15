import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidentDocsComponent } from './add-resident-docs.component';

describe('AddResidentDocsComponent', () => {
  let component: AddResidentDocsComponent;
  let fixture: ComponentFixture<AddResidentDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResidentDocsComponent]
    });
    fixture = TestBed.createComponent(AddResidentDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
