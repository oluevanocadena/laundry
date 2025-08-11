import { Component, OnInit } from '@angular/core';
import { LocationsMonitorFacade } from '../../bussiness/locations/controllers/locations.monitor.facade';

@Component({
  selector: 'app-locations',
  standalone: false,
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsPageComponent implements OnInit {


  constructor(public facade: LocationsMonitorFacade) {}

  ngOnInit() {
    this.facade.fetchLocations();
  }
}
