import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSummaryComponent } from '@private/orders/components/summary/orders-summary.component';

describe('OrdersSummaryComponent', () => {
  let fixture: ComponentFixture<OrdersSummaryComponent>;
  let component: OrdersSummaryComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersSummaryComponent],
    });

    fixture = TestBed.createComponent(OrdersSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
