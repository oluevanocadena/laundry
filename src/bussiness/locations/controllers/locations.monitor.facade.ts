import { Injectable } from '@angular/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { FacadeBase } from '../../../types/facade.base';
import { LocationsApiService } from '../locations.api.service';
import { SubjectProp } from '../../../types/subject.type';
import { Location } from '../locations.interfaces';
import { LocationsDraftFacade } from './locations.draft.facade';

@Injectable({
  providedIn: 'root',
})
export class LocationsMonitorFacade extends FacadeBase {
  //Flag Management
  showLocationDrawer = false;

  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'Activas', value: 'true' },
    { label: 'Inactivas', value: 'false' },
  ];

  locationSegment = new SubjectProp<string>('0');
  selectedLocation = new SubjectProp<Location | null>(null);

  constructor(
    public api: LocationsApiService,
    public draftFacade: LocationsDraftFacade
  ) {
    super(api);
  }

  initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */

  fetchLocations() {
    return this.api.getLocations(
      this.locationSegment.value === 'true' ? false : true
    );
  }

  /**
   * UI Events
   */

  onNewLocationClick() {
    this.draftFacade.selectedLocation.value = null;
    this.showLocationDrawer = true;
  }

  onLocationClick(location: Location) {
    this.selectedLocation.value = location;
    this.showLocationDrawer = true;
  }

  onSegmentChange(value: string | number) {
    this.locationSegment.value = value.toString();
    this.fetchLocations();
  }
}
