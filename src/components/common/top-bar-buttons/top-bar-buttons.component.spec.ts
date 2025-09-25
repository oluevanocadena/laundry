import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarButtonsComponent } from '@components/common/top-bar-buttons/top-bar-buttons.component';

describe('TopBarButtonsComponent', () => {
  let fixture: ComponentFixture<TopBarButtonsComponent>;
  let component: TopBarButtonsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [TopBarButtonsComponent],
    });

    fixture = TestBed.createComponent(TopBarButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
