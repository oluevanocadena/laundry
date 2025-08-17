import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductsDraftComponent } from "./products-draft.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ProductsDraftComponent", () => {

  let fixture: ComponentFixture<ProductsDraftComponent>;
  let component: ProductsDraftComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProductsDraftComponent]
    });

    fixture = TestBed.createComponent(ProductsDraftComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
