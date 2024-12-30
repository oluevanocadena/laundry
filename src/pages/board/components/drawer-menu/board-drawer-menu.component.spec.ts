import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardDrawerMenuComponent } from "./board-drawer-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardDrawerMenuComponent", () => {

  let fixture: ComponentFixture<BoardDrawerMenuComponent>;
  let component: BoardDrawerMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardDrawerMenuComponent]
    });

    fixture = TestBed.createComponent(BoardDrawerMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
