import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsPageComponent } from '@private/locations/locations.component';

describe('LocationsComponent', () => {
  let fixture: ComponentFixture<LocationsPageComponent>;
  let component: LocationsPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [LocationsPageComponent],
    });

    fixture = TestBed.createComponent(LocationsPageComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
