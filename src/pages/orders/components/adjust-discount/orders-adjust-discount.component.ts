import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';
import {
  DiscountTypes,
  DiscountTypesEnum,
  Order,
  OrdersService,
  PaymentMethods,
} from '../../../../services/orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SettingsService } from '../../../../services/settings.services';

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

  //Enums
  DiscountTypesEnum = DiscountTypesEnum;

  constructor(
    public orderService: OrdersService,
    public settingsService: SettingsService,
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
      this.order.discountAmount = this.amount;
      this.order.discountType = this.discountType;

      const isPercent = this.discountType === DiscountTypesEnum.Percentage;

      if (isPercent) {
        // Para porcentaje, primero calculamos el subtotal sin IVA
        const taxRate = this.settingsService.settings.value?.taxes.taxRate || 0;
        const totalWithoutTax = this.order.total / (1 + taxRate);

        // Calculamos el descuento sobre el monto sin IVA
        const discountPercentage = (this.amount ?? 0) / 100;
        this.order.discount = totalWithoutTax * discountPercentage;
      } else {
        // Para monto fijo, usamos directamente el valor
        this.order.discount = this.order.discountAmount ?? 0;
      }

      console.log('discount', this.order.discount);

      // Recalcular totales con el nuevo descuento
      this.order = this.orderService.calculateTotals(this.order);
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
    return (
      this.formGroup.controls.discountType.value ?? DiscountTypesEnum.Amount
    );
  }

  get amount() {
    return this.formGroup.controls.amount.value ?? 0;
  }

  get placeholder() {
    return this.discountType === DiscountTypesEnum.Amount
      ? 'Amount'
      : 'Percentage';
  }

  get maxNumber() {
    return this.discountType === DiscountTypesEnum.Amount ? 99999 : 100;
  }

  get stepIncrement() {
    return this.discountType === DiscountTypesEnum.Amount ? 1 : 0.1;
  }

  get postFixText() {
    return this.discountType === DiscountTypesEnum.Amount ? '$' : '%';
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
