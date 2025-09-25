import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPageComponent } from '@private/notifications/notifications.component';

describe('NotificationsComponent', () => {
  let fixture: ComponentFixture<NotificationsPageComponent>;
  let component: NotificationsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [NotificationsPageComponent],
    });

    fixture = TestBed.createComponent(NotificationsPageComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
