import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LocationsConfirmDeleteModalComponent } from "./locations-confirm-delete-modal.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LocationsConfirmDeleteModalComponent", () => {

  let fixture: ComponentFixture<LocationsConfirmDeleteModalComponent>;
  let component: LocationsConfirmDeleteModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LocationsConfirmDeleteModalComponent]
    });

    fixture = TestBed.createComponent(LocationsConfirmDeleteModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
