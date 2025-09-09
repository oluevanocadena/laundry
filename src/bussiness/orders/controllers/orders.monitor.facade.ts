import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from '@app/routes';
import { FacadeBase } from '@globals/types/facade.base';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  constructor(public api: OrdersApiService, public draftFacade: OrdersDraftFacade, public router: Router) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.fetchOrders();
  }

  bindEvents() {}

  submitForm() {}

  clearState() {
    this.api.orders.value = [];
  }

  /**
   * APi
   */

  fetchOrders() {
    this.api.getOrders();
  }

  /**
   * UI Events
   */

  onOrderClick(order: Order) {
    this.draftFacade.selectedOrder.value = order;
    this.router.navigate([routes.OrderDraft]);
  }

  onNewOrder() {
    this.draftFacade.clearState();
    this.router.navigate([routes.OrderDraft]);
  }
}
