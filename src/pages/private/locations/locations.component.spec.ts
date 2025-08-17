import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LocationsComponent } from "./locations.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LocationsComponent", () => {

  let fixture: ComponentFixture<LocationsComponent>;
  let component: LocationsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LocationsComponent]
    });

    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
