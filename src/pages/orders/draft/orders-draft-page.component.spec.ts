import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrdersDraftPageComponent } from "./orders-draft-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("OrdersDraftPageComponent", () => {

  let fixture: ComponentFixture<OrdersDraftPageComponent>;
  let component: OrdersDraftPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [OrdersDraftPageComponent]
    });

    fixture = TestBed.createComponent(OrdersDraftPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
