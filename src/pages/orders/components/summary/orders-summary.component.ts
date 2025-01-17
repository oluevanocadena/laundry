import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order } from '../../../../services/orders.service';
import {
  CustomerSettings,
  SettingsService,
} from '../../../../services/settings.services';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderPaymentStatusEnum } from '../../../../services/order-status.service';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent extends HelperPage implements OnInit {
  //Flag Management
  loading: boolean = false;
  showAdjustDiscountModal: boolean = false;
  showCollectPaymentModal: boolean = false;

  //Input
  @Input() showDeliveryFee: boolean = false;
  @Input() edition: boolean = false;

  // Order
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
    console.log(this._order);
    if (
      this.order !== null &&
      this.order.total === 0 &&
      this.order.statusPaymentId === OrderPaymentStatusEnum.Paid
    ) {
      this.order.statusPaymentId = OrderPaymentStatusEnum.Pending;
    }
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  constructor(
    public settingsService: SettingsService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * Api Calls
   */


  /**
   * UI Events
   */

  openCollectPayment() {
    this.showCollectPaymentModal = true;
  }

  openDiscount() {
    this.showAdjustDiscountModal = true;
  }

  /**
   * Getters
   */

  get canPaid(): boolean {
    return (
      this.order?.statusPaymentId === OrderPaymentStatusEnum.Pending &&
      this.order?.total > 0
    );
  }

  get canAddDiscount(): boolean {
    return (
      this.order?.statusPaymentId === OrderPaymentStatusEnum.Pending &&
      this.order?.total > 0
    );
  }

  /**
   * Life Cycle
   */
  ngOnInit() {
  }
}
