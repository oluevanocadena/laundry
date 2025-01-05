import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order, PaymentMethods } from '../../../../services/orders.service';
import {
  OrderPaymentStatus,
  OrderPaymentStatusEnum,
  OrdersStatusService,
} from '../../../../services/order-status.service';
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
    paymentMethod: new FormControl<PaymentMethods>('cash', [
      Validators.required,
    ]),
    transactionNumber: new FormControl('', [Validators.required]),
  });

  //Arrays
  paymentStatuses: OrderPaymentStatus[] = [];

  constructor(
    public nzModalService: NzModalService,
    public nzMessageService: NzMessageService,
    public ordersStatusService: OrdersStatusService
  ) {
    super();
  }

  /**
   * APi Calls
   */

  load() {
    this.ordersStatusService
      .getFakeOrderPaymentStatuses()
      .subscribe((result) => {
        this.paymentStatuses = result;
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
    if (this.order !== null) {
      this.order.statusPaymentId = OrderPaymentStatusEnum.Paid;
      this.order.statusPayment =
        this.paymentStatuses.find((x) => x.id === OrderPaymentStatusEnum.Paid)
          ?.name ?? '';
      this.order.payment = {
        id: this.order.payment.id,
        method: this.paymentMethod ?? 'cash',
        date: new Date().toISOString(),
        transactionNumber:
          this.formGroup.controls.transactionNumber.value ?? '',
      };
      this.order = this.order;
      this.orderChange.emit(this.order);
      console.log(this.order);
    }
    this.nzMessageService.success('Payment collected successfully');
    this.close();
  }

  evaluatePayment(value: 'cash' | 'card') {
    if (value === 'cash') {
      this.formGroup.controls.transactionNumber.disable();
    } else {
      this.formGroup.controls.transactionNumber.enable();
    }
    this.formGroup.controls.transactionNumber.updateValueAndValidity();
  }

  /**
   * Getters
   */

  get paymentMethod() {
    return this.formGroup.controls.paymentMethod.value;
  }

  get canSave() {
    if (this.formGroup.controls.paymentMethod.value === 'cash') {
      return true;
    } else if (this.formGroup.controls.paymentMethod.value === 'card') {
      return this.formGroup.controls.transactionNumber.valid;
    } else {
      return false;
    }
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.load();
    this.evaluatePayment(this.formGroup.controls.paymentMethod.value as any);
    this.formGroup.controls.paymentMethod.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.evaluatePayment(value);
      }
    });
  }
}
