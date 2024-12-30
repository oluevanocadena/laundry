import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardProfileMenuComponent } from "./board-profile-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardProfileMenuComponent", () => {

  let fixture: ComponentFixture<BoardProfileMenuComponent>;
  let component: BoardProfileMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardProfileMenuComponent]
    });

    fixture = TestBed.createComponent(BoardProfileMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
