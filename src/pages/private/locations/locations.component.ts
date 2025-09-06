import { Component, OnInit } from '@angular/core';
import { LocationsMonitorFacade } from '@bussiness/locations/controllers/locations.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-locations',
  standalone: false,
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsPageComponent extends HelperPage implements OnInit {
  constructor(public facade: LocationsMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  get maxLocations() {
    return 1;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.fetchLocations();
  }
}
