import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-backup',
  standalone: false,
  templateUrl: './settings-backup.component.html',
  styleUrls: ['./settings-backup.component.scss'],
})
export class SettingsBackupComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
