import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuComponent } from '@components/common/profile-menu/profile-menu.component';

describe('BoardProfileMenuComponent', () => {
  let fixture: ComponentFixture<ProfileMenuComponent>;
  let component: ProfileMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ProfileMenuComponent],
    });

    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
