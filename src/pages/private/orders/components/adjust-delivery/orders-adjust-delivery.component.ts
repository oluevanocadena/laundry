import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import {
  Order,
  OrderItemStatusEnum,
} from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';
import { Utils } from '@services/common/utils.service';

@Component({
  selector: 'orders-adjust-delivery',
  standalone: false,
  templateUrl: './orders-adjust-delivery.component.html',
  styleUrls: ['./orders-adjust-delivery.component.scss'],
})
export class OrdersAdjustDeliveryComponent
  extends HelperPage
  implements OnInit
{
  //Flag Maganement
  loading: boolean = false;
  showEditionCustomerAddress: boolean = false;

  // Order
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    if (this._order !== value) {
      this._order = value;
    }
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  //Arrays
  timeItems = tuiCreateTimePeriods(8, 20, [0, 30, 59]);
  orderItemsStatuses: string[] = [];

  //formGroup
  formGroup = new FormGroup({
    deliveryInstructions: new FormControl(''),
    deliveryDate: new FormControl(
      TuiDay.fromLocalNativeDate(moment().add(1, 'day').toDate()),
      Validators.required
    ),
    deliveryTime: new FormControl(this.timeItems[0], Validators.required),
    distanceKm: new FormControl<number>(0, Validators.required),
  });

  constructor(
    public facade: OrdersDraftFacade,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * API Calls
   */
  async load(): Promise<void> {
    try {
      this.loading = true;
      // this.orderItemsStatuses = await firstValueFrom(
      //   this.ordersStatusService.getFakeOrderItemsStatuses()
      // );
    } catch (error) {
      console.error(error);
      this.nzMessageService.error('Error loading data');
    } finally {
      this.loading = false;
    }
  }

  /**
   * UI Events
   */

  saveDelivery() {
    console.log('saveDelivery');
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  openEditionCustomerAddress() {
    this.showEditionCustomerAddress = true;

    //TODO: Open the modal
  }

  /**
   * Geters
   */

  get indications() {
    return this.formGroup.controls['deliveryInstructions'].value ?? '';
  }

  get estimatedDeliveryDate() {
    return moment(
      this.formGroup.controls['deliveryDate'].value?.toUtcNativeDate()
    ).format('DD/MM/YYYY');
  }

  get estimatedDeliveryTime() {
    return this.formGroup.controls['deliveryTime'].value?.toString() ?? '';
  }

  get distance(): number {
    return Number.parseFloat(
      this.formGroup.controls['distanceKm']?.value?.toString() ?? '0'
    );
  }

  get deliveryFee() {
    return 100 * this.distance;
  }

  get deliveryFeeOrderItem() {
    return {};
  }

  get deliveryFeeTax() {
    return this.deliveryFee - this.deliveryFeeWitoutTax;
  }

  get deliveryFeeWitoutTax() {
    return this.deliveryFee / (1 + 0.16);
  }

  get canSave() {
    return this.formGroup.valid;
  }

  /**
   *
   * Life cycle method
   */

  ngOnInit() {
    this.load();
  }
}
