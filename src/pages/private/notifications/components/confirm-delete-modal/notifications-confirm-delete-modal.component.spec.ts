import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NotificationsConfirmDeleteModalComponent } from "./notifications-confirm-delete-modal.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("NotificationsConfirmDeleteModalComponent", () => {

  let fixture: ComponentFixture<NotificationsConfirmDeleteModalComponent>;
  let component: NotificationsConfirmDeleteModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [NotificationsConfirmDeleteModalComponent]
    });

    fixture = TestBed.createComponent(NotificationsConfirmDeleteModalComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
