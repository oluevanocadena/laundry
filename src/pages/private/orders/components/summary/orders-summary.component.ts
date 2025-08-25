import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrderTotals } from '@bussiness/orders/orders.interfaces';
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

  get canPaid(): boolean {
    return (
      this.facade.order.value?.Paid === false &&
      (this.facade.orderTotals?.value?.Total ?? 0) > 0
    );
  }

  get canAddDiscount(): boolean {
    return (
      this.facade.order.value?.Paid === false &&
      (this.facade.orderTotals?.value?.Total ?? 0) > 0
    );
  }

  get orderTotals(): OrderTotals | null {
    return this.facade.orderTotals.value;
  }

  get itemsCount(): number {
    return this.facade.orderItems.value?.length ?? 0;
  }

  /**
   * Life Cycle
   */
  ngOnInit() {}
}
