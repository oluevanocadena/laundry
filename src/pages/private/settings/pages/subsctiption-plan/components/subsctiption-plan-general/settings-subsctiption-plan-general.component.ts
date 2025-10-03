import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-subsctiption-plan-general',
  standalone: false,
  templateUrl: './settings-subsctiption-plan-general.component.html',
  styleUrls: ['./settings-subsctiption-plan-general.component.scss'],
})
export class SettingsSubsctiptionPlanGeneralComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
