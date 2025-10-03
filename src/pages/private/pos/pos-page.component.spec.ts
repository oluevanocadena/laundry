import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PosPageComponent } from "./pos-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PosPageComponent", () => {

  let fixture: ComponentFixture<PosPageComponent>;
  let component: PosPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PosPageComponent]
    });

    fixture = TestBed.createComponent(PosPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
