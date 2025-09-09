import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TablePaginationComponent } from "./table-pagination.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TablePaginationComponent", () => {

  let fixture: ComponentFixture<TablePaginationComponent>;
  let component: TablePaginationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TablePaginationComponent]
    });

    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
