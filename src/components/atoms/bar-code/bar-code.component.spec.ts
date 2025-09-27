import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BarCodeComponent } from "./bar-code.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BarCodeComponent", () => {

  let fixture: ComponentFixture<BarCodeComponent>;
  let component: BarCodeComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BarCodeComponent]
    });

    fixture = TestBed.createComponent(BarCodeComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
