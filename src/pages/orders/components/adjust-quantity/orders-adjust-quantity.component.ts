import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderItem } from '../../../../services/orders.service';
import { ProductCategoryEnum } from '../../../../services/product-category.service';

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
  @Output() onAdjustQuantity: EventEmitter<AdjustQuantityEvent> =
    new EventEmitter<AdjustQuantityEvent>();

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

  //formGroup
  formGroup = new FormGroup({
    quantity: new FormControl(1, [Validators.required]),
  });

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  close() {
    this.showChange.emit(false);
  }

  sum(quantity: number) {
    if (this.formGroup.controls['quantity'].value) {
      this.formGroup.controls['quantity'].patchValue(
        parseInt(this.formGroup.controls['quantity'].value?.toString()) +
          quantity
      );
    }
  }

  adjustQuantity() {
    this.onAdjustQuantity.emit({
      item: this.item,
      quantity: this.formGroup.controls['quantity'].value || 0,
    });
  }

  deleteItem() {
    this.onAdjustQuantity.emit({
      item: this.item,
      quantity: 0,
    });
  }

  /**
   * Getters
   */
  get quantity() {
    return this.formGroup.controls['quantity']?.value || 0;
  }

  get isLaundry() {
    return this.item?.categoryId === ProductCategoryEnum.Laundry;
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
