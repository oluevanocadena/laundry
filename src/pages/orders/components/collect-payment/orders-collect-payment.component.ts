import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  //formGroup
  formGroup = new FormGroup({
    paymentMethod: new FormControl<'cash' | 'card'>('cash', [
      Validators.required,
    ]),
    transactionNumber: new FormControl(null, [Validators.required]),
  });

  constructor(
    public nzModalService: NzModalService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * Ui Events
   */

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  collectPayment() {
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
    this.evaluatePayment(this.formGroup.controls.paymentMethod.value as any);
    this.formGroup.controls.paymentMethod.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.evaluatePayment(value);
      }
    });
  }
}
