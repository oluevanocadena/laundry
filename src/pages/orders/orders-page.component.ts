import { Component, OnInit } from '@angular/core';
import { OrdersMonitorFacade } from '../../bussiness/orders/controllers/orders.monitor.facade';
import { HelperPage } from '../../components/common/helper.page';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent extends HelperPage implements OnInit { 

  constructor(public facade: OrdersMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }
}
