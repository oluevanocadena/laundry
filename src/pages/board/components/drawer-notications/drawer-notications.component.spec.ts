import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DrawerNoticationsComponent } from "./drawer-notications.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("DrawerNoticationsComponent", () => {

  let fixture: ComponentFixture<DrawerNoticationsComponent>;
  let component: DrawerNoticationsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DrawerNoticationsComponent]
    });

    fixture = TestBed.createComponent(DrawerNoticationsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
