import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LocationsConfirmDisableModalComponent } from "./locations-confirm-disable-modal.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LocationsConfirmDisableModalComponent", () => {

  let fixture: ComponentFixture<LocationsConfirmDisableModalComponent>;
  let component: LocationsConfirmDisableModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LocationsConfirmDisableModalComponent]
    });

    fixture = TestBed.createComponent(LocationsConfirmDisableModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
