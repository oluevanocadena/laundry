import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreMenuComponent } from "./store-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("StoreMenuComponent", () => {

  let fixture: ComponentFixture<StoreMenuComponent>;
  let component: StoreMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [StoreMenuComponent]
    });

    fixture = TestBed.createComponent(StoreMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
