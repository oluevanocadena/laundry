import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SettingsBackupComponent } from "./settings-backup.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SettingsBackupComponent", () => {

  let fixture: ComponentFixture<SettingsBackupComponent>;
  let component: SettingsBackupComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SettingsBackupComponent]
    });

    fixture = TestBed.createComponent(SettingsBackupComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
