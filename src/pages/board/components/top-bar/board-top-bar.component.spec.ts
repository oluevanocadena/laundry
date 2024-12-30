import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTopBarComponent } from "./board-top-bar.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTopBarComponent", () => {

  let fixture: ComponentFixture<BoardTopBarComponent>;
  let component: BoardTopBarComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTopBarComponent]
    });

    fixture = TestBed.createComponent(BoardTopBarComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
