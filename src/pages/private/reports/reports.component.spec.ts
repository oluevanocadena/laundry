import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPageComponent } from '@private/reports/reports.component';

describe('ReportsComponent', () => {
  let fixture: ComponentFixture<ReportsPageComponent>;
  let component: ReportsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ReportsPageComponent],
    });

    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
