import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerMenuComponent } from '@components/common/drawer-menu/drawer-menu.component';

describe('BoardDrawerMenuComponent', () => {
  let fixture: ComponentFixture<DrawerMenuComponent>;
  let component: DrawerMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [DrawerMenuComponent],
    });

    fixture = TestBed.createComponent(DrawerMenuComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
