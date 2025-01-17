import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalTitleComponent } from "./modal-title.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ModalTitleComponent", () => {

  let fixture: ComponentFixture<ModalTitleComponent>;
  let component: ModalTitleComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalTitleComponent]
    });

    fixture = TestBed.createComponent(ModalTitleComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
