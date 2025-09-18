import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UsersPermissionsComponent } from "./users-permissions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UsersPermissionsComponent", () => {

  let fixture: ComponentFixture<UsersPermissionsComponent>;
  let component: UsersPermissionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsersPermissionsComponent]
    });

    fixture = TestBed.createComponent(UsersPermissionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
