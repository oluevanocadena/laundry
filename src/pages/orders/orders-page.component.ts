import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../components/common/helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';
import { Order, OrdersService } from '../../services/orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import {
  TableOptionItemSelectEvent,
  TableOptionsItem,
} from '../../components/common/table-options/table-options.component';
import {
  TableSegmentsItem,
  TableSegmentsItemEvent,
} from '../../components/common/table-segments/table-segments.component';

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
  });

  //Arrays

  //Arrays
  options: TableOptionsItem[] = [
    { label: 'Edit', icon: 'pencil', id: 1 },
    { label: 'View', icon: 'arrow-up-right', id: 2 },
    { label: 'Cancel', icon: 'ban', id: 3 },
  ];
  //'All', 'Unprocessed', 'UnPaid', 'Completed', 'Cancelled'
  optionsSegments: TableSegmentsItem[] = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Unprocessed' },
    { id: 3, label: 'UnPaid' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Cancelled' },
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
