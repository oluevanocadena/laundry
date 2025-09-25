import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonResponsiveComponent } from '@components/common/button-responsive/button-responsive.component';

describe('ButtonResponsiveComponent', () => {
  let fixture: ComponentFixture<ButtonResponsiveComponent>;
  let component: ButtonResponsiveComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ButtonResponsiveComponent],
    });

    fixture = TestBed.createComponent(ButtonResponsiveComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
