import { Component, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import {
  OrderItemStatusEnum,
  OrderStatusEnum,
} from '@bussiness/orders/orders.enums';
import { Order, OrderItem } from '@bussiness/orders/orders.interfaces';
import { Product } from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '../../../../../globals/utils/utils.domain';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent extends HelperPage implements OnInit {
  utils = UtilsDomain;
  itemsDomain = OrdersItemsDomain;

  constructor(
    public facade: OrdersDraftFacade,
    public sessionService: SessionService
  ) {
    super();
  }

  /**
   * UI Events
   */
  getPriceAtStore(product: Product): number {
    const locationId = this.sessionService.SessionInfo.value?.Location?.id;
    const productPrice = product?.ProductLocationPrice?.find(
      (price) => price.LocationId === locationId
    );
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
    return this.facade.order.value?.Paid === false;
  }

  get order(): Order | null {
    return this.facade.order.value;
  }

  get canProcessOrder(): boolean {
    return (
      this.isPendingPayment === false &&
      this.itemsCount > 0 &&
      this.facade.edition === true &&
      this.order?.StatusId === OrderStatusEnum.Pending
    );
  }

  get canSearchProduct(): boolean {
    return (
      (this.isPendingPayment === true ||
        this.order?.StatusId === OrderStatusEnum.Draft) &&
      this.order?.StatusId !== OrderStatusEnum.Cancelled
    );
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
