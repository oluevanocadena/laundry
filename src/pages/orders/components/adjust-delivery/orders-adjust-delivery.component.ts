import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';
import {
  CustomerSettings,
  SettingsService,
} from '../../../../services/settings.services';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order } from '../../../../services/orders.service';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';

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

  //Models
  customerSettings: CustomerSettings | undefined;

  constructor(
    public settingsService: SettingsService,
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
      this.customerSettings = await firstValueFrom(
        this.settingsService.getSettingsFake(1)
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
        this.order.customer.address.distanceKm = this.distance;
        this.order.delivery!.distanceKm = this.distance;
        this.order.deliveryFee = this.deliveryFee;
        this.order.delivery.indications = this.indications;
        this.order.delivery.date = this.estimatedDeliveryDate;
        this.order.delivery.estimatedDate = this.estimatedDeliveryDate;
        this.order.delivery.estimatedTime = this.estimatedDeliveryTime;
        this.order = { ...this.order };
        this.orderChange.emit(this.order);
      }
      this.onSave.emit(this.formGroup.value);
      this.close();
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
    return (this.customerSettings?.delivery.pricePerKm ?? 0) * this.distance;
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
