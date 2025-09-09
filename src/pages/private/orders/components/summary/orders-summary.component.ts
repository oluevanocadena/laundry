import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { PaymentsDomain } from '@bussiness/orders/domains/payments.domain';
import { OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order, OrderTotals } from '@bussiness/orders/interfaces/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent extends HelperPage implements OnInit {

  paymentsDomain = PaymentsDomain;

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get order(): Order | null {
    return this.facade.order.value;
  }
 

  // get canAddDiscount(): boolean {
  //   return (
  //     this.facade.order.value?.Paid === false &&
  //     (this.facade.orderTotals?.value?.Total ?? 0) > 0
  //   );
  // }

  // get canRemoveDiscount(): boolean {
  //   return (
  //     this.canAddDiscount === false &&
  //     (this.facade.orderTotals?.value?.Discount ?? 0) > 0 &&
  //     (this.order?.StatusId === OrderStatusEnum.Pending ||
  //       this.order?.StatusId === OrderStatusEnum.Draft) &&
  //     this.paid === false
  //   );
  // }

  get orderTotals(): OrderTotals | null {
    return this.facade.orderTotals.value;
  }

  get itemsCount(): number {
    return this.facade.orderItems.value?.length ?? 0;
  }

  get discountApplied(): boolean {
    return (this.facade.orderTotals.value?.Discount ?? 0) > 0;
  } 

  /**
   * Life Cycle
   */
  ngOnInit() {}
}
