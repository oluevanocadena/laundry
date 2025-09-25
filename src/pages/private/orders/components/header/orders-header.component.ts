import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { PaymentStatusIdEnum } from '@bussiness/orders/enums/order.payment.enums';
import { OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  //Domains
  ordersDomain = OrdersDomain;

  dateCreated = moment().locale('es').toDate().toString();

  constructor(public facade: OrdersDraftFacade, public router: Router) {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.facade.order.onChange((order) => {
      if (order?.createdAt) {
        this.dateCreated = order?.createdAt || moment().locale('es').toDate().toString();
      }
    });
  }

  onBack() {
    this.router.navigate([this.routes.Orders]);
  }

  /**
   * Getters
   */

  get busy() {
    return this.facade.api.busy.value;
  }

  get orderName() {
    return this.order?.OrderNumber ? `#${this.order?.OrderNumber}` : '';
  }

  get order(): Order | null {
    return this.facade.order.value;
  }

  get paid(): boolean {
    return this.facade.order.value?.PaymentStatusId === PaymentStatusIdEnum.Paid;
  }

  get saveLabelButton(): string {
    switch (this.order?.StatusId) {
      case OrderStatusEnum.Draft:
        return 'Crear y cobrar';
      case OrderStatusEnum.Pending:
        if (this.paid) {
          return 'Guardar pedido';
        } else {
          return 'Guardar y cobrar';
        }
      default:
        return 'Guardar cambios';
    }
  }

  get canShowMoreMenu(): boolean {
    return this.facade.edition === true && this.order?.StatusId !== OrderStatusEnum.Cancelled;
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
