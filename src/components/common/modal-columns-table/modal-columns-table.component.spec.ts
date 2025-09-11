import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalColumnsTableComponent } from "./modal-columns-table.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ModalColumnsTableComponent", () => {

  let fixture: ComponentFixture<ModalColumnsTableComponent>;
  let component: ModalColumnsTableComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalColumnsTableComponent]
    });

    fixture = TestBed.createComponent(ModalColumnsTableComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
