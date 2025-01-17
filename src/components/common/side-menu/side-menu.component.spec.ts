import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SideMenuComponent } from "./side-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SideMenuComponent", () => {

  let fixture: ComponentFixture<SideMenuComponent>;
  let component: SideMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SideMenuComponent]
    });

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
