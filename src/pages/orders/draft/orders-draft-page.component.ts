import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../components/common/helper.page';
import {
  Order,
  OrderEmpty,
  OrderItem,
  OrdersService,
} from '../../../services/orders.service';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent extends HelperPage implements OnInit {
  //Models
  order: Order = OrderEmpty;

  constructor(
    public ordersService: OrdersService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * UI Events
   */

  itemsChange(items: OrderItem[]) {
    if (this.order !== null) {
      this.order.orderItems = items;
    }
    console.log('Items Change:', items);
  }

  /**
   * Getters
   */
  

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
