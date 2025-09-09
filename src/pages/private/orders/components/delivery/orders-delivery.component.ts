import { Component, Input, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { DeliveryDomain } from '@bussiness/orders/domains/delivery.domain';
import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
@Component({
  selector: 'orders-delivery',
  standalone: false,
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.scss'],
})
export class OrdersDeliveryComponent implements OnInit {
  //Domains
  deliveryDomain = DeliveryDomain;

  //Input
  @Input() edition: boolean = false;

  constructor(public facade: OrdersDraftFacade) {}

  /**
   * Geters
   */

  get isDelivery() {
    return this.deliveryType === DeliveryTypesEnum.Delivery;
  }

  get hadCustomer(): boolean {
    return this.facade.orderCustomer.value !== null;
  }

  get customer() {
    return this.facade.orderCustomer.value;
  }

  get orderDelivery() {
    return this.facade.orderDelivery.value;
  }

  get deliveryType() {
    return this.orderDelivery?.DeliveryType;
  }

  get canAdjustDelivery() {
    return !(this.facade.order.value?.ItemCount ?? 0 > 0);
  }

  get order() {
    return this.facade.order.value;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
