import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDocsComponent } from './add-user-docs.component';

describe('AddUserDocsComponent', () => {
  let component: AddUserDocsComponent;
  let fixture: ComponentFixture<AddUserDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserDocsComponent]
    });
    fixture = TestBed.createComponent(AddUserDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
