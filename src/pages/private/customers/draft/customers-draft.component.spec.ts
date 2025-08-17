import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CustomersDraftComponent } from "./customers-draft.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CustomersDraftComponent", () => {

  let fixture: ComponentFixture<CustomersDraftComponent>;
  let component: CustomersDraftComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CustomersDraftComponent]
    });

    fixture = TestBed.createComponent(CustomersDraftComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
