import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersConfirmDisableModalComponent } from '@private/customers/components/header/components/customers-confirm-disable-modal/customers-confirm-disable-modal.component';

describe('CustomersConfirmDisableModalComponent', () => {
  let fixture: ComponentFixture<CustomersConfirmDisableModalComponent>;
  let component: CustomersConfirmDisableModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [CustomersConfirmDisableModalComponent],
    });

    fixture = TestBed.createComponent(CustomersConfirmDisableModalComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
