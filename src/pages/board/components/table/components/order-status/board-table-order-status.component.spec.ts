import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableOrderStatusComponent } from "./board-table-order-status.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableOrderStatusComponent", () => {

  let fixture: ComponentFixture<BoardTableOrderStatusComponent>;
  let component: BoardTableOrderStatusComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableOrderStatusComponent]
    });

    fixture = TestBed.createComponent(BoardTableOrderStatusComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
