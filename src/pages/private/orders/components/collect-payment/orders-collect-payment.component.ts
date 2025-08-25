import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    transactionNumber: new FormControl('', [Validators.required]),
  });

  paymentMethod = new FormProp<PaymentMethods>(
    this.formGroup,
    'paymentMethod',
    'cash'
  );
  transactionNumber = new FormProp<string>(
    this.formGroup,
    'transactionNumber',
    ''
  );

  constructor(
    public facade: OrdersDraftFacade, 
    public cdr: ChangeDetectorRef
  ) {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.paymentMethod.onChange((value) => {
      if (value === PaymentMethodsEnum.Cash) {
        this.transactionNumber.value = null;
      }
      this.cdr.detectChanges();
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
    if (this.formGroup.controls.paymentMethod.value === 'cash') {
      return true;
    } else if (this.formGroup.controls.paymentMethod.value === 'card') {
      return this.formGroup.controls.transactionNumber.valid;
    } else {
      return false;
    }
  }

  get disableTransactionNumber() {
    return this.paymentMethod.value === PaymentMethodsEnum.Cash;
  }

  get orderTotals() {
    return this.facade.orderTotals.value;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
