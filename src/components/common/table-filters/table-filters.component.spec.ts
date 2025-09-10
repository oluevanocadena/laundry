import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TableFiltersComponent } from "./table-filters.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TableFiltersComponent", () => {

  let fixture: ComponentFixture<TableFiltersComponent>;
  let component: TableFiltersComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TableFiltersComponent]
    });

    fixture = TestBed.createComponent(TableFiltersComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
