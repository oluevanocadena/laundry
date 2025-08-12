import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductsHeaderComponent } from "./products-header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProductsHeaderComponent", () => {

  let fixture: ComponentFixture<ProductsHeaderComponent>;
  let component: ProductsHeaderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductsHeaderComponent]
    });

    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
