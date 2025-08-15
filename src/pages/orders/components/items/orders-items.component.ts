import { Component, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '../../../../components/common/helper.page';
import { OrderPaymentStatusEnum } from '../../../../services/order-status.service';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent extends HelperPage implements OnInit {
  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get itemsCount() {
    return this.facade.orderItems.value?.length ?? 0;
  }

  get isPendingPayment() {
    return this.facade.order.value?.statusPaymentId ===
      OrderPaymentStatusEnum.Pending
      ? true
      : false;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
