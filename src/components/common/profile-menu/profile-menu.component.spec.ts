import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProfileMenuComponent } from "./board-profile-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardProfileMenuComponent", () => {

  let fixture: ComponentFixture<ProfileMenuComponent>;
  let component: ProfileMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ProfileMenuComponent]
    });

    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
