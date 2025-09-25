import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from '@components/common/drawer/drawer.component';

describe('DrawerComponent', () => {
  let fixture: ComponentFixture<DrawerComponent>;
  let component: DrawerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [DrawerComponent],
    });

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
