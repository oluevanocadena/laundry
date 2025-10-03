import { Component, Input, OnInit } from '@angular/core';
import { PointOfSaleDraftFacade } from '@bussiness/settings/controllers/pos.settings.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-point-of-sale-general',
  standalone: false,
  templateUrl: './settings-point-of-sale-general.component.html',
  styleUrls: ['./settings-point-of-sale-general.component.scss'],
})
export class SettingsPointOfSaleGeneralComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

  constructor(public facade: PointOfSaleDraftFacade) {
    super();
  }

  ngOnInit() {}
}
