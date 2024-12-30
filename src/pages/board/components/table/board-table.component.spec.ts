import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableComponent } from "./board-table.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableComponent", () => {

  let fixture: ComponentFixture<BoardTableComponent>;
  let component: BoardTableComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableComponent]
    });

    fixture = TestBed.createComponent(BoardTableComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
