import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CustomersMonitorFacade } from '../../bussiness/customers/controllers/customers.monitor.facade';
import { HelperPage } from '../../components/common/helper.page';

@Component({
  selector: 'app-customers-page',
  standalone: false,
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CustomersPageComponent extends HelperPage implements OnInit {
  constructor(public facade: CustomersMonitorFacade) {
    super();
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
