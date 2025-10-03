import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-deactivate',
  standalone: false,
  templateUrl: './settings-deactivate.component.html',
  styleUrls: ['./settings-deactivate.component.scss'],
})
export class SettingsDeactivateComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
