import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersConfirmDisableModalComponent } from "./customers-confirm-disable-modal.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersConfirmDisableModalComponent", () => {

  let fixture: ComponentFixture<CustomersConfirmDisableModalComponent>;
  let component: CustomersConfirmDisableModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersConfirmDisableModalComponent]
    });

    fixture = TestBed.createComponent(CustomersConfirmDisableModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
