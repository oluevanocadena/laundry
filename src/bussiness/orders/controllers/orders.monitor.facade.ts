import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersApiService } from '@bussiness/orders/orders.api.service';
import { Order } from '@bussiness/orders/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  constructor(
    public api: OrdersApiService,
    public draftFacade: OrdersDraftFacade,
    public router: Router
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.fetchOrders();
  }

  bindEvents() {}

  clearState() {
    this.api.orders.value = [];
  }

  submitForm() {}

  /**
   * APi
   */

  fetchOrders() {
    this.api.getOrders();
  }

  /**
   * UI Events
   */

  onNewOrder() {
    this.draftFacade.clearState();
    this.router.navigate([routes.OrderDraft]);
  }

  onEditOrder(order: Order) {
    this.draftFacade.order.value = order;
    this.router.navigate([routes.OrderDraft]);
  }
}
