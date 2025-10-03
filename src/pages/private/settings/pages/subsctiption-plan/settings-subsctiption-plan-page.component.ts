import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'settings-subsctiption-plan-page',
  standalone: false,
  templateUrl: './settings-subsctiption-plan-page.component.html',
  styleUrls: ['./settings-subsctiption-plan-page.component.scss'],
})
export class SettingsSubsctiptionPlanPageComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
