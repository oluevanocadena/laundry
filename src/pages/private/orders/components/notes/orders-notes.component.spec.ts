import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersNotesComponent } from '@private/orders/components/notes/orders-notes.component';

describe('OrdersNotesComponent', () => {
  let fixture: ComponentFixture<OrdersNotesComponent>;
  let component: OrdersNotesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [OrdersNotesComponent],
    });

    fixture = TestBed.createComponent(OrdersNotesComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
