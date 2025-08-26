import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

@Component({
  selector: 'orders-adjust-delivery',
  standalone: false,
  templateUrl: './orders-adjust-delivery.component.html',
  styleUrls: ['./orders-adjust-delivery.component.scss'],
})
export class OrdersAdjustDeliveryComponent extends HelperPage {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      this.facade.formDelivery.reset({
        deliveryType: this.facade.orderDelivery.value?.DeliveryType,
        deliveryDate: this.facade.orderDelivery.value?.Date as unknown as TuiDay,
        deliveryTime: this.facade.orderDelivery.value?.Time as unknown as TuiTime,
        deliveryCost: this.facade.orderDelivery.value?.Cost,
        deliveryInstructions: this.facade.orderDelivery.value?.Indications,
      });
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public facade: OrdersDraftFacade,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  saveDelivery() {
    this.facade.onSelectDelivery();
  }
  /**
   * Getters
   */

  get canSave() {
    return this.facade.formDelivery.valid;
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
