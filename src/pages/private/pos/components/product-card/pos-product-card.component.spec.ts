import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PosProductCardComponent } from "./pos-product-card.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PosProductCardComponent", () => {

  let fixture: ComponentFixture<PosProductCardComponent>;
  let component: PosProductCardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PosProductCardComponent]
    });

    fixture = TestBed.createComponent(PosProductCardComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
