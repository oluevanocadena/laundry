import { Component, OnInit } from '@angular/core';
import { SupportMonitorFacade } from '@bussiness/support/controllers/support.monitor.facade';
import { SupportDomain } from '@bussiness/support/domains/support.domains';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'page-support',
  standalone: false,
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportPageComponent extends HelperPage implements OnInit {

  SupportDomain = SupportDomain;
  
  constructor(public facade: SupportMonitorFacade) {
    super();
  }

  ngOnInit() {
    this.facade.initialize();
  }

  getItemChecked(item: any): boolean {
    return item.Checked || false;
  }

  setItemChecked(item: any, checked: boolean): void {
    item.Checked = checked;
  }
}
