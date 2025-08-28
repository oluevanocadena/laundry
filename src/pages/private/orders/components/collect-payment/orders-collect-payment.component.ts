import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { PaymentMethodsEnum } from '@bussiness/orders/orders.enums';
import { PaymentMethods } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';
import { FormProp } from '@type/form.type';

@Component({
  selector: 'orders-collect-payment',
  standalone: false,
  templateUrl: './orders-collect-payment.component.html',
  styleUrls: ['./orders-collect-payment.component.scss'],
})
export class OrdersCollectPaymentComponent extends HelperPage {
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
    paymentMethod: new FormControl<PaymentMethods>('cash', [
      Validators.required,
    ]),
    transactionNumber: new FormControl(null, [Validators.required]),
  });

  paymentMethod = new FormProp<PaymentMethods>(
    this.formGroup,
    'paymentMethod',
    PaymentMethodsEnum.Cash
  );
  transactionNumber = new FormProp<string>(
    this.formGroup,
    'transactionNumber',
    null
  );

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
    this.facade.onCollectPayment(
      this.paymentMethod.value as PaymentMethodsEnum,
      this.transactionNumber.value ?? undefined
    );
    this.close();
  }

  /**
   * Getters
   */

  get canSave() {
    return (
      this.paymentMethod.value === PaymentMethodsEnum.Cash ||
      this.paymentMethod.value === PaymentMethodsEnum.None ||
      (this.paymentMethod.value === PaymentMethodsEnum.Card &&
        this.transactionNumber.value)
    );
  }

  get orderTotals() {
    return this.facade.orderTotals.value;
  }

  get orderId() {
    return this.facade.order.value?.OrderNumber ?? null;
  }

  get collectPaymentLabel() {
    return this.paymentMethod.value === PaymentMethodsEnum.None
      ? `${this.orderId ? 'Guardar' : 'Crear'} orden sin pago`
      : 'Recibir pago';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
