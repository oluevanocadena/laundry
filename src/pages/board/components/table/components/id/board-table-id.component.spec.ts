import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableIdComponent } from "./board-table-id.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableIdComponent", () => {

  let fixture: ComponentFixture<BoardTableIdComponent>;
  let component: BoardTableIdComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableIdComponent]
    });

    fixture = TestBed.createComponent(BoardTableIdComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
