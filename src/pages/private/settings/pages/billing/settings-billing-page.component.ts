import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-settings-billing-page',
  standalone: false,
  templateUrl: './settings-billing-page.component.html',
  styleUrls: ['./settings-billing-page.component.scss'],
})
export class SettingsBillingPageComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
