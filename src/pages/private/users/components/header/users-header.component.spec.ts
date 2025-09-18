import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UsersHeaderComponent } from "./users-header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

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
