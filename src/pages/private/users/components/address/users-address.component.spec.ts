import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAddressComponent } from '@pages/private/customers/components/address/customers-address.component';

describe('CustomersAddressComponent', () => {
  let fixture: ComponentFixture<CustomersAddressComponent>;
  let component: CustomersAddressComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [CustomersAddressComponent],
    });

    fixture = TestBed.createComponent(CustomersAddressComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
