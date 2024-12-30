import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableAmountComponent } from "./board-table-amount.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableAmountComponent", () => {

  let fixture: ComponentFixture<BoardTableAmountComponent>;
  let component: BoardTableAmountComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableAmountComponent]
    });

    fixture = TestBed.createComponent(BoardTableAmountComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
