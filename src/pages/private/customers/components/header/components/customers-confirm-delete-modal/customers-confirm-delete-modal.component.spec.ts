import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersConfirmDeleteModalComponent } from '@private/customers/components/header/components/customers-confirm-delete-modal/customers-confirm-delete-modal.component';

describe('CustomersConfirmDeleteModalComponent', () => {
  let fixture: ComponentFixture<CustomersConfirmDeleteModalComponent>;
  let component: CustomersConfirmDeleteModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [CustomersConfirmDeleteModalComponent],
    });

    fixture = TestBed.createComponent(CustomersConfirmDeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
