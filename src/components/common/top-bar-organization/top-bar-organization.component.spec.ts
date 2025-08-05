import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TopBarOrganizationComponent } from "./top-bar-organization.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TopBarOrganizationComponent", () => {

  let fixture: ComponentFixture<TopBarOrganizationComponent>;
  let component: TopBarOrganizationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TopBarOrganizationComponent]
    });

    fixture = TestBed.createComponent(TopBarOrganizationComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
