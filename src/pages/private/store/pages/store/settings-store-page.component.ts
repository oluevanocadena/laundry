import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-store-page',
  standalone: false,
  templateUrl: './settings-store-page.component.html',
  styleUrls: ['./settings-store-page.component.scss'],
})
export class SettingsStorePageComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
