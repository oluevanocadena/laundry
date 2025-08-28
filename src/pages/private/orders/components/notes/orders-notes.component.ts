import { Component, OnInit } from '@angular/core';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrderStatusEnum } from '@bussiness/orders/orders.enums';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-notes',
  standalone: false,
  templateUrl: './orders-notes.component.html',
  styleUrls: ['./orders-notes.component.scss'],
})
export class OrdersNotesComponent extends HelperPage implements OnInit {
  constructor(public facade: OrdersDraftFacade) {
    super();
    if (this.disableNotesEdition) {
      this.facade.formGroup.get('notes')?.disable();
    }
  }

  /**
   * Gettters
   */

  get order() {
    return this.facade.selectedOrder.value;
  }

  get disableNotesEdition() {
    return (
      this.order?.StatusId === OrderStatusEnum.Completed ||
      this.order?.StatusId === OrderStatusEnum.Cancelled
    );
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
