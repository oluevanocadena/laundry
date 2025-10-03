import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsStorePaymentsAndShippingComponent } from "./settings-store-payments-and-shipping.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsStorePaymentsAndShippingComponent", () => {

  let fixture: ComponentFixture<SettingsStorePaymentsAndShippingComponent>;
  let component: SettingsStorePaymentsAndShippingComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsStorePaymentsAndShippingComponent]
    });

    fixture = TestBed.createComponent(SettingsStorePaymentsAndShippingComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
