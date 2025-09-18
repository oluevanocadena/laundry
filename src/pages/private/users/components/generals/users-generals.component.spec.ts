import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UsersGeneralsComponent } from "./users-generals.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UsersGeneralsComponent", () => {

  let fixture: ComponentFixture<UsersGeneralsComponent>;
  let component: UsersGeneralsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsersGeneralsComponent]
    });

    fixture = TestBed.createComponent(UsersGeneralsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
