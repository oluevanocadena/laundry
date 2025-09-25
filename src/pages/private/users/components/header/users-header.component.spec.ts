import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersHeaderComponent } from "@private/users/components/header/users-header.component";

describe("UsersHeaderComponent", () => {

  let fixture: ComponentFixture<UsersHeaderComponent>;
  let component: UsersHeaderComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsersHeaderComponent]
    });

    fixture = TestBed.createComponent(UsersHeaderComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
