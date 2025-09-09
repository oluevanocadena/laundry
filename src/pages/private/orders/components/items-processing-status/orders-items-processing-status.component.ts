import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { DeliveryDomain } from '@bussiness/orders/domains/delivery.domain';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';
import { OrderItemStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-items-processing-status',
  standalone: false,
  templateUrl: './orders-items-processing-status.component.html',
  styleUrls: ['./orders-items-processing-status.component.scss'],
})
export class OrdersItemsProcessingStatusComponent
  extends HelperPage
  implements OnInit
{
  deliveryDomain = DeliveryDomain;

  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      this.selectedStatus = this.ItemStatusId - 1;
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onConfirm: EventEmitter<OrderItemStatusEnum> =
    new EventEmitter<OrderItemStatusEnum>();

  //Models
  selectedStatus: OrderItemStatusEnum = OrderItemStatusEnum.NotProccesed;

  //Arrays
  options: NzSegmentedOption[] = OrdersItemsDomain.statusesOptions();

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  confirmProcess() {
    this.onConfirm.emit(this.selectedStatus + 1);
    this.facade.updateOrderItemStatus(this.selectedStatus + 1);
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */
  get ItemStatusId() {
    return (
      this.facade.orderItemSelected.value?.ItemStatusId ??
      OrderItemStatusEnum.NotProccesed
    );
  }

  get order() {
    return this.facade.order.value;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
