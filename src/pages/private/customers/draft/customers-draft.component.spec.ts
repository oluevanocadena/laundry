import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDraftComponent } from '@private/customers/draft/customers-draft.component';

describe('CustomersDraftComponent', () => {
  let fixture: ComponentFixture<CustomersDraftComponent>;
  let component: CustomersDraftComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [CustomersDraftComponent],
    });

    fixture = TestBed.createComponent(CustomersDraftComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
