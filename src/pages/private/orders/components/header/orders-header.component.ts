import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { TuiAppearanceOptions } from '@taiga-ui/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  constructor(
    public facade: OrdersDraftFacade,
    public router: Router
  ) {
    super();
  }

  onBack() {
    this.router.navigate([this.routes.Orders]);
  }

  /**
   * Getters
   */

  get dateCreated(): string {
    return (
      this.facade.order.value?.createdAt ||
      moment().locale('es').toDate().toString()
    );
  }

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get orderName() {
    return this.facade.order.value?.number || '';
  }

  get orderStatus(): string {
    return this.facade.order.value?.status || '';
  }

  get orderStatusAppearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.order.value?.status === 'draft' ? 'warning' : 'success';
  }

  get canSave(): boolean {
    return this.facade.formGroup.valid;
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
