import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order, OrderItem } from '@bussiness/orders/orders.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
 

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
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Item
  private _item: OrderItem | null = null;
  @Input() set item(value: OrderItem) {
    this._item = value;
    if (value?.quantity) {
      this.formGroup.controls['quantity'].patchValue(value?.quantity);
    }
  }
  get item(): OrderItem | null {
    return this._item;
  }
  @Output() itemChange: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  //Index
  @Input() indexItem: number | null = null;

  //Order
  private _order: Order | null = null;
  @Input() set order(value: Order | null) {
    this._order = value;
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order | null> =
    new EventEmitter<Order | null>();

  //formGroup
  formGroup = new FormGroup({
    quantity: new FormControl(1, [Validators.required]),
  });

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

  sum(quantity: number) {
    if (this.quantity > 0) {
      this.formGroup.controls['quantity'].patchValue(this.quantity + quantity);
    }
  }

  adjustQuantity() {
    if (this.order !== null && this.indexItem !== null) {
      let item = this.order.orderItems[this.indexItem];
      item.quantity = this.quantity;
      item.total = item.price * item.quantity;
      this.order.orderItems = this.order.orderItems.filter(
        (x) => x.id !== item.id
      );
      this.order.orderItems.push(item);
      // this.order = this.orderservice.calculateTotals(this.order as Order);
      this.orderChange.emit(this.order as Order);
      this.close();
    }
  }

  deleteItem() {
    if (this.order !== null && this.indexItem !== null) {
      this.order.orderItems = this.order.orderItems.filter(
        (x, index) => index !== this.indexItem
      );
      // this.order = this.orderservice.calculateTotals(this.order as Order);
      this.orderChange.emit(this.order as Order);
      this.close();
    }
  }

  /**
   * Getters
   */
  get quantity() {
    return this.formGroup.controls['quantity']?.value || 0;
  }

  get adjustedQuantity() {
    return this.isLaundry || this.isIroning ? 0.1 : 1;
  }

  get isLaundry() {
    return this.item?.category === 'Laundry';
  }

  get isIroning() {
    return this.item?.category === 'Ironing';
  }

  /**
   * Life Cycles
   */
  ngOnInit() {}
}

export interface AdjustQuantityEvent {
  item: any;
  quantity: number;
}
