import { Component, Input, OnInit } from '@angular/core';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'customers-summary',
  standalone: false,
  templateUrl: './customers-summary.component.html',
  styleUrls: ['./customers-summary.component.scss'],
})
export class CustomersSummaryComponent extends HelperPage implements OnInit {

  @Input() collapsed: boolean = false;

  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get hadPhone(): boolean {
    return this.facade.phone.value !== null && this.facade.phone.value.length > 0;
  }

  ngOnInit() {}
}
