import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersPageComponent } from "@private/users/users.component";

describe("UsersComponent", () => {

  let fixture: ComponentFixture<UsersPageComponent>;
  let component: UsersPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsersPageComponent]
    });

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
