import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TopBarComponent } from "./board-top-bar.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTopBarComponent", () => {

  let fixture: ComponentFixture<TopBarComponent>;
  let component: TopBarComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TopBarComponent]
    });

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
