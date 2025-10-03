import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PosScannerModalComponent } from "./pos-scanner-modal.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PosScannerModalComponent", () => {

  let fixture: ComponentFixture<PosScannerModalComponent>;
  let component: PosScannerModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PosScannerModalComponent]
    });

    fixture = TestBed.createComponent(PosScannerModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
