import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PluginsMenuComponent } from "./plugins-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PluginsMenuComponent", () => {

  let fixture: ComponentFixture<PluginsMenuComponent>;
  let component: PluginsMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PluginsMenuComponent]
    });

    fixture = TestBed.createComponent(PluginsMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
