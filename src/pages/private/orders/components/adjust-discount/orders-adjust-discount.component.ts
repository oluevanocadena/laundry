import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { DiscountTypes, Order } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-adjust-discount',
  standalone: false,
  templateUrl: './orders-adjust-discount.component.html',
  styleUrls: ['./orders-adjust-discount.component.scss'],
})
export class OrdersAdjustDiscountComponent extends HelperPage {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  // FormGroup
  formGroup = new FormGroup({
    discountType: new FormControl<DiscountTypes>('amount'),
    amount: new FormControl(0, [Validators.required]),
  });

  constructor(
    public facade: OrdersDraftFacade,
    public nzmessage: NzMessageService
  ) {
    super();
  }

  /**
   * APi Calls
   */

  load() {}

  /**
   * Ui Events
   */

  applyDiscount() {
    if (this.order) {
      this.order.DiscountAmount = this.amount;

      const isPercent = this.discountType === 1;

      if (isPercent) {
        // Para porcentaje, primero calculamos el subtotal sin IVA
        const taxRate = 0.16;
        const totalWithoutTax = this.order.Total / (1 + taxRate);

        // Calculamos el descuento sobre el monto sin IVA
        const discountPercentage = (this.amount ?? 0) / 100;
        this.order.DiscountAmount = totalWithoutTax * discountPercentage;
      } else {
        // Para monto fijo, usamos directamente el valor
        this.order.DiscountAmount = this.order.DiscountAmount ?? 0;
      }

      console.log('discount', this.order.DiscountAmount);

      // Recalcular totales con el nuevo descuento
      // this.order = this.orderService.calculateTotals(this.order);
    }

    this.orderChange.emit(this.order);
    this.close();
  }

  resetAmount() {
    this.formGroup.controls.amount.setValue(0);
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */

  get discountType() {
    return this.formGroup.controls.discountType.value ?? 1;
  }

  get amount() {
    return this.formGroup.controls.amount.value ?? 0;
  }

  get placeholder() {
    return this.discountType === 1 ? 'Amount' : 'Percentage';
  }

  get maxNumber() {
    return this.discountType === 1 ? 99999 : 100;
  }

  get stepIncrement() {
    return this.discountType === 1 ? 1 : 0.1;
  }

  get postFixText() {
    return this.discountType === 1 ? '$' : '%';
  }

  get canSave() {
    return this.formGroup.valid;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.load();
  }
}
