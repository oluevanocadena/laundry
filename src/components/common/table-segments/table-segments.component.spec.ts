import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TableSegmentsComponent } from "./table-segments.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TableSegmentsComponent", () => {

  let fixture: ComponentFixture<TableSegmentsComponent>;
  let component: TableSegmentsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TableSegmentsComponent]
    });

    fixture = TestBed.createComponent(TableSegmentsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
