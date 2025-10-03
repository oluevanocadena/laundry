import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PosCategoryTabsComponent } from "./pos-category-tabs.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PosCategoryTabsComponent", () => {

  let fixture: ComponentFixture<PosCategoryTabsComponent>;
  let component: PosCategoryTabsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PosCategoryTabsComponent]
    });

    fixture = TestBed.createComponent(PosCategoryTabsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
