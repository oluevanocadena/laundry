import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChangePasswordModalComponent } from '@private/users/components/change-password-modal/users-change-password-modal.component';

describe('UsersChangePasswordModalComponent', () => {
  let fixture: ComponentFixture<UsersChangePasswordModalComponent>;
  let component: UsersChangePasswordModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [UsersChangePasswordModalComponent],
    });

    fixture = TestBed.createComponent(UsersChangePasswordModalComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
