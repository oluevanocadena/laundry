import { Component, OnInit } from '@angular/core';

import { HomeFacade } from '@bussiness/home/controllers/home.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'top-bar-organization',
  standalone: false,
  templateUrl: './top-bar-organization.component.html',
  styleUrls: ['./top-bar-organization.component.scss'],
})
export class TopBarOrganizationComponent extends HelperPage implements OnInit {
  constructor(public facade: HomeFacade) {
    super();
  }

  /**
   * Getters
   */

  get locations() {
    return this.facade.repoLocations.locations.value?.filter(
      (location) => location.Deleted === false && location.Disabled === false,
    );
  }

  ngOnInit() {
    this.facade.initialize();
  }
}
