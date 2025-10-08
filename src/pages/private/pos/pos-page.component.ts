import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';

import { PosFacade } from '@bussiness/pos/controllers/pos.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'pos-page',
  standalone: false,
  templateUrl: './pos-page.component.html',
  styleUrls: ['./pos-page.component.scss'],
})
export class PosPageComponent extends HelperPage implements AfterViewInit, OnDestroy {
  OrdersDomain = OrdersDomain;

  constructor(public facade: PosFacade) {
    super();
  }

  /**
   * Getters
   */

  get products() {
    return this.facade.repoProducts.products.value?.data ?? [];
  }

  get totalOrder() {
    return this.facade.ordersDraftFacade.orderTotals.value?.Total ?? 0;
  }

  get order() {
    return this.facade.ordersDraftFacade.order.value;
  }

  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    this.facade.initialize();
  }

  ngOnDestroy(): void {
    this.facade.unbindEvents();
  }
}
