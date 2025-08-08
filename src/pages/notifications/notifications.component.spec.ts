import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NotificationsComponent } from "./notifications.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("NotificationsComponent", () => {

  let fixture: ComponentFixture<NotificationsComponent>;
  let component: NotificationsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [NotificationsComponent]
    });

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
