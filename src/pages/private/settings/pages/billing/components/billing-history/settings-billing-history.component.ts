import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-billing-history',
  standalone: false,
  templateUrl: './settings-billing-history.component.html',
  styleUrls: ['./settings-billing-history.component.scss'],
})
export class SettingsBillingHistoryComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
