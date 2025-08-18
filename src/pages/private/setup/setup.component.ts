import { Component, OnInit } from '@angular/core';
import { SetupFacade } from '@bussiness/setup/controllers/setup.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-setup',
  standalone: false,
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupPageComponent extends HelperPage {
  constructor(public facade: SetupFacade) {
    super();
  }

  ngOnInit() {}
}
