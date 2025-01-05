import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order } from '../../../../services/orders.service';
import {
  CustomerSettings,
  SettingsService,
} from '../../../../services/settings.services';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent extends HelperPage implements OnInit {
  //Flag Management
  loading: boolean = false;
  showCollectPaymentModal: boolean = false;

  //Input
  @Input() showDeliveryFee: boolean = false;
  @Input() edition: boolean = false;

  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  //Models
  customerSettings: CustomerSettings | null = null;

  constructor(
    public settingsService: SettingsService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * Api Calls
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

  openCollectPayment() {
    this.showCollectPaymentModal = true;
  }

  /**
   * Getters
   */

  /**
   * Life Cycle
   */
  ngOnInit() {
    this.load();
  }
}
