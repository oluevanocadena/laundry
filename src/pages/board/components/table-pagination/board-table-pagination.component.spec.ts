import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTablePaginationComponent } from "./board-table-pagination.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTablePaginationComponent", () => {

  let fixture: ComponentFixture<BoardTablePaginationComponent>;
  let component: BoardTablePaginationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTablePaginationComponent]
    });

    fixture = TestBed.createComponent(BoardTablePaginationComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
