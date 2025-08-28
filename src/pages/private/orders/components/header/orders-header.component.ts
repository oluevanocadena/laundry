import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrderStatusEnum } from '@bussiness/orders/orders.enums';
import { Order, OrderTotals } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  dateCreated = '';

  constructor(public facade: OrdersDraftFacade, public router: Router) {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.facade.order.onChange((order) => {
      this.dateCreated =
        order?.createdAt || moment().locale('es').toDate().toString();
    });
  }

  onBack() {
    this.router.navigate([this.routes.Orders]);
  }

  /**
   * Getters
   */

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get orderName() {
    return this.order?.OrderNumber ? `#${this.order?.OrderNumber}` : '';
  }

  get order(): Order | null {
    return this.facade.order.value;
  }

  get paid(): boolean {
    return this.facade.order.value?.Paid ?? false;
  }

  get orderStatus(): string {
    return OrderStatusEnum[this.facade.order.value?.StatusId ?? 0] || 'Pending';
  }

  get canSave(): boolean {
    return (
      this.paid === false &&
      this.itemsCount > 0 &&
      !!this.facade.orderCustomer.value?.id
    );
  }

  get orderTotals(): OrderTotals | null {
    return this.facade.orderTotals.value;
  }

  get itemsCount(): number {
    return this.facade.orderItems.value?.length ?? 0;
  }

  get total(): number {
    return this.facade.orderTotals?.value?.Total ?? 0;
  }

  get canPaid(): boolean {
    return this.facade.order.value?.Paid === false && (this.total ?? 0) > 0;
  }

  get orderStatusName(): string {
    switch (this.order?.StatusId) {
      case OrderStatusEnum.Draft:
        return 'Borrador';
      case OrderStatusEnum.Pending:
        return 'Pendiente';
      case OrderStatusEnum.Completed:
        return 'Completado';
      case OrderStatusEnum.Cancelled:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
