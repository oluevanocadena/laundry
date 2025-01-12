import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MenuContentComponent } from "./menu-content.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("MenuContentComponent", () => {

  let fixture: ComponentFixture<MenuContentComponent>;
  let component: MenuContentComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [MenuContentComponent]
    });

    fixture = TestBed.createComponent(MenuContentComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
