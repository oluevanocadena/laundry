import { Component, OnInit } from '@angular/core';
import { OrdersMonitorFacade } from '@bussiness/orders/controllers/orders.monitor.facade';
import { Order } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

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

  statusName(item: Order): string {
    switch (item?.StatusId) {
      case 1:
        return 'Borrador';
      case 2:
        return 'Pendiente';
      case 3:
        return 'En proceso';
      case 4:
        return 'Completado';
      case 5:
        return 'Cancelado';
      case 6:
        return 'Reembolsado';
      default:
        return 'Pendiente';
    }
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }
}
