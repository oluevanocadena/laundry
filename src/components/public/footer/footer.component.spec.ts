import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFooterComponent } from '@components/public/footer/footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<PublicFooterComponent>;
  let component: PublicFooterComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [PublicFooterComponent],
    });

    fixture = TestBed.createComponent(PublicFooterComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
