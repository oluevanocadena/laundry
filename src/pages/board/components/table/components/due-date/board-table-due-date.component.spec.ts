import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableDueDateComponent } from "./board-table-due-date.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableDueDateComponent", () => {

  let fixture: ComponentFixture<BoardTableDueDateComponent>;
  let component: BoardTableDueDateComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableDueDateComponent]
    });

    fixture = TestBed.createComponent(BoardTableDueDateComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
