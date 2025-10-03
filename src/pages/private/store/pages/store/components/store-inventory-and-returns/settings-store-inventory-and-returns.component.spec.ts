import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsStoreInventoryAndReturnsComponent } from "./settings-store-inventory-and-returns.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsStoreInventoryAndReturnsComponent", () => {

  let fixture: ComponentFixture<SettingsStoreInventoryAndReturnsComponent>;
  let component: SettingsStoreInventoryAndReturnsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsStoreInventoryAndReturnsComponent]
    });

    fixture = TestBed.createComponent(SettingsStoreInventoryAndReturnsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
