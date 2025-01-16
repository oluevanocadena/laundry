import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from '../../../../services/orders.service';
import {
  CustomerSettings,
  SettingsService,
} from '../../../../services/settings.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'orders-delivery',
  standalone: false,
  templateUrl: './orders-delivery.component.html',
  styleUrls: ['./orders-delivery.component.scss'],
})
export class OrdersDeliveryComponent implements OnInit {
  //Flag Managment
  loading: boolean = false;
  showAdjustDelivery: boolean = false;

  //Input
  @Input() edition: boolean = false;

  //Order
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
    if (this.hadCustomer === false) {
      this.formGroup.get('deliveryType')?.disable();
    } else {
      this.formGroup.get('deliveryType')?.enable();
    }
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  //formGroup
  formGroup = new FormGroup({
    deliveryType: new FormControl<'pickup' | 'delivery'>('pickup'),
  });

  constructor(
    public settingsService: SettingsService,
    public nzMessageService: NzMessageService
  ) {}

  /**
   * Api Calls
   */

  async load(): Promise<void> {
    try {
      this.loading = true;
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

  openAdjustDelivery() {
    this.showAdjustDelivery = true;
  }

  /**
   * Geters
   */

  get isDelivery() {
    return this.formGroup.get('deliveryType')?.value === 'delivery';
  }
  //Customer id >0
  get hadCustomer(): boolean {
    return this.order &&
      this.order?.customer !== null &&
      this.order.customer.id?.trim() !== ''
      ? true
      : false;
  }
  /**
   * Life cycle method
   */
  ngOnInit() {}
}
