import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableActionsComponent } from '@components/common/table-actions/table-actions.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TableActionsComponent', () => {
  let fixture: ComponentFixture<TableActionsComponent>;
  let component: TableActionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [TableActionsComponent],
    });

    fixture = TestBed.createComponent(TableActionsComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
