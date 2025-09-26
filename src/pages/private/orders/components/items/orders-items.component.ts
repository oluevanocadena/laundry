import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';
import { PaymentStatusIdEnum } from '@bussiness/orders/enums/order.payment.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent extends HelperPage implements OnInit {
  utils = UtilsDomain;
  itemsDomain = OrdersItemsDomain;
  ordersDomain = OrdersDomain;

  constructor(public facade: OrdersDraftFacade, public sessionService: SessionService) {
    super();
  }

  /**
   * UI Events
   */
  getPriceAtStore(product: Product): number {
    const locationId = this.sessionService.sessionInfo.value?.Location?.id;
    const productPrice = product?.ProductLocationPrice?.find((price) => price.LocationId === locationId);
    return productPrice?.Price ?? 0;
  }

  /**
   * Getters
   */

  get orderItems() {
    return this.facade.orderItems.value;
  }

  get itemsCount() {
    return this.orderItems?.length ?? 0;
  }

  get isPendingPayment() {
    return (
      this.facade.order.value?.PaymentStatusId === PaymentStatusIdEnum.Pending ||
      this.facade.order.value?.PaymentStatusId === PaymentStatusIdEnum.PendingOnDelivery
    );
  }

  get order(): Order | null {
    return this.facade.order.value;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
