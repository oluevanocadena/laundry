import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalSortComponent } from "./modal-sort.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ModalSortComponent", () => {

  let fixture: ComponentFixture<ModalSortComponent>;
  let component: ModalSortComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalSortComponent]
    });

    fixture = TestBed.createComponent(ModalSortComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
