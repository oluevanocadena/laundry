import { Component, Input, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import {
  DeliveryTypesEnum,
  OrderStatusEnum,
} from '@bussiness/orders/orders.enums';

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
      ? 'Recolección en sucursal'
      : 'Envío a domicilio';
  }

  get canAdjustDelivery() {
    return !(this.facade.order.value?.ItemCount ?? 0 > 0);
  }

  get googleUrlMap(): string {
    return this.facade.orderCustomer.value?.Address
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          this.facade.orderCustomer.value?.Address
        )}`
      : '';
  }

  get canChangeDelivery(): boolean {
    return (
      this.facade.order.value?.StatusId !== OrderStatusEnum.Cancelled &&
      this.facade.order.value?.StatusId !== OrderStatusEnum.Completed &&
      this.facade.order.value?.StatusId !== OrderStatusEnum.Refunded
    );
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
