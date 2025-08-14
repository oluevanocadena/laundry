import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductsMediaComponent } from "./products-media.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

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
