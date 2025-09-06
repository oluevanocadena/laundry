import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PluginsPageComponent } from "./plugins-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PluginsPageComponent", () => {

  let fixture: ComponentFixture<PluginsPageComponent>;
  let component: PluginsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PluginsPageComponent]
    });

    fixture = TestBed.createComponent(PluginsPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
