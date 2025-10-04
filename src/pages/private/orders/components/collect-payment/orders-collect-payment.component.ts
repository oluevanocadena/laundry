import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import numeral from 'numeral';

import { HelperPage } from '@components/common/helper.page';
import { FormProp } from '@globals/types/form.type';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
import { PaymentMethodsEnum } from '@bussiness/orders/enums/order.payment.enums';
import { DeliveryTypes } from '@bussiness/orders/types/orders.types';
import { PaymentMethods } from '@bussiness/orders/types/payments.type';

@Component({
  selector: 'orders-collect-payment',
  standalone: false,
  templateUrl: './orders-collect-payment.component.html',
  styleUrls: ['./orders-collect-payment.component.scss'],
})
export class OrdersCollectPaymentComponent extends HelperPage {
  OrdersDomain = OrdersDomain;

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // FormGroup
  formGroup = new FormGroup({
    paymentMethod: new FormControl<PaymentMethods>('cash', [Validators.required]),
    transactionNumber: new FormControl(null, [Validators.required]),
  });

  paymentMethod = new FormProp<PaymentMethods>(this.formGroup, 'paymentMethod', PaymentMethodsEnum.Cash);
  transactionNumber = new FormProp<string>(this.formGroup, 'transactionNumber', null);

  constructor(public facade: OrdersDraftFacade) {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.paymentMethod.onChange((value) => {
      if (value === PaymentMethodsEnum.Cash) {
        this.transactionNumber.value = null;
      }
    });
  }

  /**
   * Ui Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  collectPayment() {
    this.facade.onCollectPayment(this.paymentMethod.value as PaymentMethodsEnum, this.transactionNumber.value ?? undefined);
    this.close();
  }

  /**
   * Getters
   */

  get orderTotals() {
    return this.facade.orderTotals.value;
  }

  get orderId() {
    return this.facade.order.value?.OrderNumber ?? null;
  }

  get collectPaymentLabel() {
    return this.paymentMethod.value === PaymentMethodsEnum.CashOnDelivery
      ? `${this.orderId ? 'Guardar' : 'Crear'} orden sin pago`
      : `Cobrar ${numeral(this.orderTotals?.Total ?? 0).format('$0,0.00')} `;
  }

  get deliveryType() {
    return this.facade.order.value?.DeliveryType! as DeliveryTypes;
  }

  get cashMessage() {
    switch (this.deliveryType) {
      case DeliveryTypesEnum.StoreOrShowroom:
        return 'El total de la orden de se pagará en efectivo en mostrador.';
      case DeliveryTypesEnum.Delivery:
        return 'El total de la orden de se pagará en contra-entrega.';
      case DeliveryTypesEnum.Pickup:
        return 'El total de la orden de se pagará en la recogida de producto en la sucursal.';
      default:
        return 'El total de la orden de se pagará en efectivo.';
    }
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
