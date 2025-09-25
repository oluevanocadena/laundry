import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersNotesComponent } from '@private/customers/components/notes/customers-notes.component';

describe('CustomersNotesComponent', () => {
  let fixture: ComponentFixture<CustomersNotesComponent>;
  let component: CustomersNotesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [CustomersNotesComponent],
    });

    fixture = TestBed.createComponent(CustomersNotesComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
