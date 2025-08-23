import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order, OrderItem } from '@bussiness/orders/orders.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { FormProp } from '@type/form.type';

@Component({
  selector: 'orders-adjust-quantity',
  standalone: false,
  templateUrl: './orders-adjust-quantity.component.html',
  styleUrls: ['./orders-adjust-quantity.component.scss'],
})
export class OrdersAdjustQuantityComponent
  extends HelperPage
  implements OnInit
{
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      this.quantity.value = this.facade.orderItemSelected.value?.Quantity ?? 0;
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  //formGroup
  formGroup = new FormGroup({
    quantity: new FormControl(0, [Validators.required]),
  });

  quantity = new FormProp(this.formGroup, 'quantity', 0);

  //Show Confirm
  showConfirm: boolean = false;

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  close() {
    this.show = false;
    this.showChange.emit(false);
  }

  confirm() {
    this.facade.onAdjustQuantity(this.quantity.value ?? 0);
    this.close();
  }

  deleteItem() {
    this.showConfirm = true;
  }

  onConfirmDelete() {
    this.facade.onDeleteItem();
    this.close();
  }

  /**
   * Getters
   */

  get orderItem() {
    return this.facade.orderItemSelected.value;
  }

  get postFixText(): string {
    return this.orderItem?.UnitMeasure?.Name
      ? ' ' + this.orderItem?.UnitMeasure?.Name + '(s)'
      : '';
  }

  get canUpdate() {
    return (this.quantity.value ?? 0) > 0;
  }

  /**
   * Life Cycles
   */
  ngOnInit() {
    this.quantity.value = this.facade.orderItemSelected.value?.Quantity ?? 0;
  }
}

export interface AdjustQuantityEvent {
  item: any;
  quantity: number;
}
