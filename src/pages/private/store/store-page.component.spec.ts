import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StorePageComponent } from "./store-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("StorePageComponent", () => {

  let fixture: ComponentFixture<StorePageComponent>;
  let component: StorePageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [StorePageComponent]
    });

    fixture = TestBed.createComponent(StorePageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
