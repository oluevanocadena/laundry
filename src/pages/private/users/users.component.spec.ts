import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UsersComponent } from "./users.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UsersComponent", () => {

  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsersComponent]
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
