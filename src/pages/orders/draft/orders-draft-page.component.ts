import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { HelperPage } from '../../../components/common/helper.page';
import { Utils } from '../../../services/common/utils.service';
import {
  OrderItemsStatus,
  OrderItemsStatusEnum,
  OrdersStatusService,
  OrderStatus,
  OrderStatusEnum,
} from '../../../services/order-status.service';
import {
  Order,
  OrderEmpty,
  OrderItem,
  OrdersService,
} from '../../../services/orders.service';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent extends HelperPage implements OnInit {
  //Flag Management
  loading: boolean = false;

  //Models
  order: Order = OrderEmpty;

  //Arrays
  orderStatuses: OrderStatus[] = [];
  orderItemsStatuses: OrderItemsStatus[] = [];

  constructor(
    public nzMessageService: NzMessageService,
    public ordersService: OrdersService,
    public ordersStatusService: OrdersStatusService,
  ) {
    super();
  }

  /**
   * APi Calls
   */

  async load(): Promise<void> {
    try {
      this.loading = true;
      this.orderStatuses = await firstValueFrom(
        this.ordersStatusService.getFakeOrderStatuses()
      );
      this.orderItemsStatuses = await firstValueFrom(
        this.ordersStatusService.getFakeOrderItemsStatuses()
      );
      // Set status name's
      if (this.order !== null) {
        this.order.status =
          this.orderStatuses.find((x) => x.id === this.order.statusId)?.name ??
          '';
        this.order.statusItems =
          this.orderItemsStatuses.find((x) => x.id === this.order.statusItemsId)
            ?.name ?? '';
      }
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
  ngOnInit() {
    if (this.order) {
      this.order.id = Utils.Text.newGuid();
      this.order.statusId = OrderStatusEnum.Draft;
      this.order.statusItemsId = OrderItemsStatusEnum.NotProccesed;
      this.load();
    }
  }
}
