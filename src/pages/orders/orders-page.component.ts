import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../components/common/helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';
import { Order, OrdersService } from '../../services/orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent extends HelperPage implements OnInit {
  //Flag Management
  showFilterOptions: boolean = false;
  loading: boolean = false;

  //Index
  indexTab: number = 0;

  // Outputs
  @Output() onTabChange: EventEmitter<number> = new EventEmitter<number>();

  //FormGroup
  formGroup = new FormGroup({
    date: new FormControl(
      TuiDay.fromLocalNativeDate(moment().add(1, 'day').toDate())
    ),
    orderType: new FormControl('All'),
  });

  //Arrays
  orderTypes = ['All', 'Unprocessed', 'UnPaid', 'Completed', 'Cancelled'];
  orders: Order[] = [];

  constructor(
    public ordersService: OrdersService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * APi Calls
   */
  load() {
    this.loading = true;
    this.ordersService
      .getFakeOrders()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        this.orders = res;
      });
  }

  /**
   * UI Events
   */

  onChangeTab(index: number) {
    this.onTabChange.emit(index);
  }

  onSelectFilter(option: string) {
    this.formGroup.get('orderType')?.setValue(option);
    this.showFilterOptions = false;
  }

  /**
   * Getters
   */
  get orderType() {
    return this.formGroup.get('orderType')?.value ?? '';
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.load();
  }
}
