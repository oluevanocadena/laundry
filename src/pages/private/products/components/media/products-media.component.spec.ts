import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsMediaComponent } from "@private/products/components/media/products-media.component";

describe("ProductsMediaComponent", () => {

  let fixture: ComponentFixture<ProductsMediaComponent>;
  let component: ProductsMediaComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductsMediaComponent]
    });

    fixture = TestBed.createComponent(ProductsMediaComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
