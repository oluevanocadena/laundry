import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomersCreateModalComponent } from "@private/customers/components/create-modal/customers-create-modal.component";

describe("CustomersCreateModalComponent", () => {

  let fixture: ComponentFixture<CustomersCreateModalComponent>;
  let component: CustomersCreateModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersCreateModalComponent]
    });

    fixture = TestBed.createComponent(CustomersCreateModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
