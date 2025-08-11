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
    { label: 'Activas', value: 'false' },
    { label: 'Inactivas', value: 'true' },
  ];

  locationSegment = new SubjectProp<string>('0'); 

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
    this.api.getLocations(this.disabled);
  }

  /**
   * UI Events
   */

  onNewLocationClick() {
    this.draftFacade.selectedLocation.value = null;
    this.showLocationDrawer = true;
  }

  onLocationClick(location: Location) {
    this.draftFacade.selectedLocation.value = location;
    this.showLocationDrawer = true;
  }

  onSegmentChange(value: string | number) {
    this.locationSegment.value = value.toString();
    this.fetchLocations();
  }

  /**
   * Getters
   */

  get disabled(): boolean | null {
    switch (this.locationSegment.value) {
      case '0':
        return null; //All
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  }
}
