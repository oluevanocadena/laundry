import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CustomersMonitorFacade } from '@bussiness/customers/controllers/customers.monitor.facade';
import { HelperPage } from '@components/common/helper.page';
import { TypeFilterShow } from '@components/common/table-filters/table-filters.component';

@Component({
  selector: 'app-customers-page',
  standalone: false,
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CustomersPageComponent extends HelperPage implements OnInit {
  showType: TypeFilterShow = {
    calendar: false,
    sort: true,
  };

  constructor(public facade: CustomersMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  get rowCount() {
    return this.facade.api.pagedCustomers.value?.count ?? 0;
  }

  get columns() {
    return this.facade.columns;
  }

  get data() {
    return this.facade.api.pagedCustomers.value?.data ?? [];
  }

  get busy() {
    return this.facade.api.busy.value;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.fetchCustomers();
  }
}
