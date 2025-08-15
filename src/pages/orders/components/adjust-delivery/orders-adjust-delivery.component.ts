import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { OrdersDraftFacade } from '../../../../bussiness/orders/controllers/orders.draft.facade';
import { Order } from '../../../../bussiness/orders/orders.interfaces';
import { HelperPage } from '../../../../components/common/helper.page';
import { Utils } from '../../../../services/common/utils.service';
import {
  OrderItemsStatus,
  OrderItemsStatusEnum,
  OrdersStatusService,
} from '../../../../services/order-status.service';
import {
  SettingsService
} from '../../../../services/settings.services';

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
      this.formGroup.controls['distanceKm'].patchValue(
        value.delivery.distanceKm ?? 0
      );
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
  orderItemsStatuses: OrderItemsStatus[] = [];

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
    public settingsService: SettingsService,
    public facade: OrdersDraftFacade,
    public ordersStatusService: OrdersStatusService,
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
      this.orderItemsStatuses = await firstValueFrom(
        this.ordersStatusService.getFakeOrderItemsStatuses()
      );
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
    if (this.canSave) {
      if (this.order !== null) {
        this.setDeliveryFeeOrderItem();
        // this.order.customer.address.distanceKm = this.distance;
        this.order.delivery!.distanceKm = this.distance;
        this.order.deliveryFee = this.deliveryFee;
        this.order.delivery.fee = this.deliveryFee;
        this.order.delivery.indications = this.indications;
        this.order.delivery.date = this.estimatedDeliveryDate;
        this.order.delivery.estimatedDate = this.estimatedDeliveryDate;
        this.order.delivery.estimatedTime = this.estimatedDeliveryTime;
        // this.order = this.orderservice.calculateTotals(this.order as Order);
        this.orderChange.emit(this.order);
      }
      this.onSave.emit(this.formGroup.value);
      this.close();
    }
  }

  setDeliveryFeeOrderItem() {
    let item = this.deliveryFeeOrderItem;
    if (this.order && item === undefined) {
      item = {
        id: 0,
        isDeliveryFee: true,
        name: 'Delivery Fee',
        price: this.deliveryFeeWitoutTax,
        quantity: 1,
        tax: this.deliveryFeeTax,
        category: 'Delivery',
        total: this.deliveryFee,
        subtotal: this.deliveryFeeWitoutTax,
        status:
          this.orderItemsStatuses?.find(
            (x) => x.id === OrderItemsStatusEnum.NotProccesed
          )?.name ?? '',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 5,
        productId: undefined,
        oderId: this.order?.id ?? Utils.Text.newGuid(),
      };
      this.order.orderItems.push(item);
    } else if (this.order && item !== undefined) {
      item.price = this.deliveryFee;
      item.tax = this.deliveryFeeTax;
      item.total = this.deliveryFee;
      item.subtotal = this.deliveryFeeWitoutTax;
      this.order.orderItems.slice(this.order.orderItems.indexOf(item), 1);
      this.order.orderItems.push(item);
    }
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
    return (
      (this.settingsService.settings.value?.delivery.pricePerKm ?? 0) *
      this.distance
    );
  }

  get deliveryFeeOrderItem() {
    return this.order?.orderItems.find((x) => x.isDeliveryFee === true);
  }

  get deliveryFeeTax() {
    return this.deliveryFee - this.deliveryFeeWitoutTax;
  }

  get deliveryFeeWitoutTax() {
    return (
      this.deliveryFee /
      (1 + (this.settingsService.settings.value?.taxes.taxRate ?? 0))
    );
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
