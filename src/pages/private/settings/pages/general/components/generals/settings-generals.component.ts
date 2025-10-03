import { Component, Input, OnInit } from '@angular/core';
import { OrganizationsFacade } from '@bussiness/settings/controllers/organizations.settings.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-generals',
  standalone: false,
  templateUrl: './settings-generals.component.html',
  styleUrls: ['./settings-generals.component.scss'],
})
export class SettingsGeneralsComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;
  constructor(public facade: OrganizationsFacade) {
    super();
  }

  ngOnInit() {}
}
