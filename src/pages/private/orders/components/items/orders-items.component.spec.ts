import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersItemsComponent } from '@private/orders/components/items/orders-items.component';

describe('OrdersItemsComponent', () => {
  let fixture: ComponentFixture<OrdersItemsComponent>;
  let component: OrdersItemsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersItemsComponent],
    });

    fixture = TestBed.createComponent(OrdersItemsComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
