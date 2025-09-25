import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsPrincingComponent } from "@private/products/components/princing/products-princing.component";

describe("ProductsPrincingComponent", () => {

  let fixture: ComponentFixture<ProductsPrincingComponent>;
  let component: ProductsPrincingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductsPrincingComponent]
    });

    fixture = TestBed.createComponent(ProductsPrincingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
