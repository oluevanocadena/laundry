import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalSearchComponent } from "./modal-search.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ModalSearchComponent", () => {

  let fixture: ComponentFixture<ModalSearchComponent>;
  let component: ModalSearchComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalSearchComponent]
    });

    fixture = TestBed.createComponent(ModalSearchComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
