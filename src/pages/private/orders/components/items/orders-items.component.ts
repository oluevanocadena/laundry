import { Component, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrderStatusEnum } from '@bussiness/orders/orders.interfaces';
import { Product } from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '@utils/utils.domain';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent extends HelperPage implements OnInit {
  utils = UtilsDomain;

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
    return this.facade.order.value?.StatusId === OrderStatusEnum.Pending;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
