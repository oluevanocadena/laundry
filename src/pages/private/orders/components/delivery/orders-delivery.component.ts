import { Component, Input, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { DeliveryTypesEnum } from '@bussiness/orders/orders.enums';

@Component({
  selector: 'orders-delivery',
  standalone: false,
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.scss'],
})
export class OrdersDeliveryComponent implements OnInit {
  //Input
  @Input() edition: boolean = false;

  constructor(public facade: OrdersDraftFacade) {}

  /**
   * UI Events
   */

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

  get deliveryTypeText() {
    return this.deliveryType === DeliveryTypesEnum.Pickup
      ? 'Recoger en sucursal'
      : 'Envío a domicilio';
  }

  get canAdjustDelivery() {
    return !(this.facade.order.value?.ItemCount ?? 0 > 0);
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
