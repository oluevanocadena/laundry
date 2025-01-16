import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { HelperPage } from '../../components/common/helper.page';
import { SearchModalEvent } from '../../components/common/modal-search/modal-search.component';
import {
  TableOptionItemSelectEvent,
  TableOptionsItem,
} from '../../components/common/table-options/table-options.component';
import {
  TableSegmentsItem,
  TableSegmentsItemEvent,
} from '../../components/common/table-segments/table-segments.component';
import { OrderStatusEnum } from '../../services/order-status.service';
import { Order, OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent extends HelperPage implements OnInit {
  //Flag Management
  showSort: boolean = false;
  showSearch: boolean = false;
  loading: boolean = false;

  //Index
  indexTab: number = 0;

  //Arrays
  options: TableOptionsItem[] = [
    { label: 'Edit', icon: 'pencil', id: 1 },
    { label: 'View', icon: 'arrow-up-right', id: 2 },
    { label: 'Cancel', icon: 'ban', id: 3 },
  ];
  //'All', 'Unprocessed', 'UnPaid', 'Completed', 'Cancelled'
  optionsSegments: TableSegmentsItem[] = [
    { id: 0, label: 'All' },
    { id: OrderStatusEnum.Draft, label: 'Draft' },
    { id: OrderStatusEnum.Pending, label: 'Unprocessed' },
    { id: OrderStatusEnum.Processing, label: 'Processing' },
    { id: OrderStatusEnum.Completed, label: 'Completed' },
    { id: OrderStatusEnum.Cancelled, label: 'Cancelled' },
    { id: OrderStatusEnum.Refunded, label: 'Refunded' },
  ];
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
  openSearchModal() {
    this.showSearch = true;
  }

  openSortModal() {
    this.showSort = true;
  }

  onSearch(value: SearchModalEvent) {
    console.log('value', value);
  }

  onSort(value: string) {
    console.log('value', value);
  }

  onSegmentChange(event: TableSegmentsItemEvent) {
    console.log('event', event);
  }

  onSelectOption(event: TableOptionItemSelectEvent) {
    console.log('event', event);
  }

  export() {
    console.log('Export');
  }

  /**
   * Getters
   */

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.load();
  }
}
