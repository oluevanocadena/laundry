import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SetupPageComponent } from "@private/setup/setup.component";

describe("SetupComponent", () => {

  let fixture: ComponentFixture<SetupPageComponent>;
  let component: SetupPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SetupPageComponent]
    });

    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
