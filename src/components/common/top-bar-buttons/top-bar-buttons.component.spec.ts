import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TopBarButtonsComponent } from "./top-bar-buttons.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TopBarButtonsComponent", () => {

  let fixture: ComponentFixture<TopBarButtonsComponent>;
  let component: TopBarButtonsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TopBarButtonsComponent]
    });

    fixture = TestBed.createComponent(TopBarButtonsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
