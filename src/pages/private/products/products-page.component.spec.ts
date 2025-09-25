import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsPageComponent } from "@private/products/products-page.component";

describe("ProductsPageComponent", () => {

  let fixture: ComponentFixture<ProductsPageComponent>;
  let component: ProductsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductsPageComponent]
    });

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
