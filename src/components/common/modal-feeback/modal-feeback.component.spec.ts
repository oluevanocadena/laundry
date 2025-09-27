import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalFeebackComponent } from "./modal-feeback.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ModalFeebackComponent", () => {

  let fixture: ComponentFixture<ModalFeebackComponent>;
  let component: ModalFeebackComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalFeebackComponent]
    });

    fixture = TestBed.createComponent(ModalFeebackComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
