import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDraftComponent } from '@private/users/draft/users-draft.component';

describe('UsersDraftComponent', () => {
  let fixture: ComponentFixture<UsersDraftComponent>;
  let component: UsersDraftComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [UsersDraftComponent],
    });

    fixture = TestBed.createComponent(UsersDraftComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
