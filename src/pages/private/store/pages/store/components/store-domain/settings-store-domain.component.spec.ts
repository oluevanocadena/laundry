import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsStoreDomainComponent } from "./settings-store-domain.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsStoreDomainComponent", () => {

  let fixture: ComponentFixture<SettingsStoreDomainComponent>;
  let component: SettingsStoreDomainComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsStoreDomainComponent]
    });

    fixture = TestBed.createComponent(SettingsStoreDomainComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
