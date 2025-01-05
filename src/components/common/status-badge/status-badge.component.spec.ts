import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StatusBadgeComponent } from "./status-badge.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("StatusBadgeComponent", () => {

  let fixture: ComponentFixture<StatusBadgeComponent>;
  let component: StatusBadgeComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [StatusBadgeComponent]
    });

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
