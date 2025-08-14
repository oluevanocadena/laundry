import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { FacadeBase } from '../../../types/facade.base';
import { OrdersApiService } from '../orders.api.service';
import { OrdersDraftFacade } from './orders.draft.facade';
import { routes } from '../../../app/routes';
import { Order } from '../orders.interfaces';

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
