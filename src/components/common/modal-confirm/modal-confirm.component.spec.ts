import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmComponent } from '@components/common/modal-confirm/modal-confirm.component';

describe('ModalConfirmComponent', () => {
  let fixture: ComponentFixture<ModalConfirmComponent>;
  let component: ModalConfirmComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ModalConfirmComponent],
    });

    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
