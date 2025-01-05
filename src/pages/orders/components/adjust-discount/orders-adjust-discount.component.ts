import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';
import {
  DiscountTypes,
  Order,
  OrdersService,
  PaymentMethods,
} from '../../../../services/orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  //Arrays

  constructor(
    public orderService: OrdersService,
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
      this.order = this.orderService.calculateTotals(this.order);
    }
    this.orderChange.emit(this.order);
    this.close();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */

  get discountType() {
    return this.formGroup.controls.discountType.value;
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
