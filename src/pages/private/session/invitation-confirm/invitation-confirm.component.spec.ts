import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvitationConfirmComponent } from "@private/session/invitation-confirm/invitation-confirm.component";

describe('InvitationConfirmComponent', () => {
  let fixture: ComponentFixture<InvitationConfirmComponent>;
  let component: InvitationConfirmComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [InvitationConfirmComponent],
    });

    fixture = TestBed.createComponent(InvitationConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
