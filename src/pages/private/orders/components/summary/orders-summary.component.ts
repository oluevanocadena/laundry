import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrderStatusEnum } from '@bussiness/orders/orders.enums';
import { Order, OrderTotals } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent extends HelperPage implements OnInit {
  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get order(): Order | null {
    return this.facade.order.value;
  }

  get paid(): boolean {
    return this.facade.order.value?.Paid ?? false;
  }

  get canAddDiscount(): boolean {
    return (
      this.facade.order.value?.Paid === false &&
      (this.facade.orderTotals?.value?.Total ?? 0) > 0
    );
  }

  get canRemoveDiscount(): boolean {
    return (
      this.canAddDiscount === false &&
      (this.facade.orderTotals?.value?.Discount ?? 0) > 0 &&
      (this.order?.StatusId === OrderStatusEnum.Pending ||
        this.order?.StatusId === OrderStatusEnum.Draft) &&
      this.paid === false
    );
  }

  get orderTotals(): OrderTotals | null {
    return this.facade.orderTotals.value;
  }

  get itemsCount(): number {
    return this.facade.orderItems.value?.length ?? 0;
  }

  get discountApplied(): boolean {
    return (this.facade.orderTotals.value?.Discount ?? 0) > 0;
  }

  get canRefund(): boolean {
    return (
      this.paid &&
      this.facade.edition === true &&
      this.order?.StatusId !== OrderStatusEnum.Cancelled &&
      this.order?.StatusId !== OrderStatusEnum.Refunded
    );
  }

  /**
   * Life Cycle
   */
  ngOnInit() {}
}
