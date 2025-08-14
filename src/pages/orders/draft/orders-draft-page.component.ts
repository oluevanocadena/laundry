import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '../../../bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '../../../components/common/helper.page';
import {
  OrderItemsStatus,
  OrderPaymentStatus,
  OrderStatus,
} from '../../../services/order-status.service';
import { Order, OrderEmpty } from '../../../services/orders.service';

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
  orderPaymentStatuses: OrderPaymentStatus[] = [];

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * APi Calls
   */

  // async load() {
  //   try {
  //     this.loading = true;
  //     this.orderStatuses = await firstValueFrom(
  //       this.ordersStatusService.getFakeOrderStatuses()
  //     );
  //     this.orderItemsStatuses = await firstValueFrom(
  //       this.ordersStatusService.getFakeOrderItemsStatuses()
  //     );
  //     this.orderPaymentStatuses = await firstValueFrom(
  //       this.ordersStatusService.getFakeOrderPaymentStatuses()
  //     );
  //     // Set status name's
  //     if (this.order !== null) {
  //       this.order.status =
  //         this.orderStatuses.find((x) => x.id === this.order.statusId)?.name ??
  //         '';
  //       this.order.statusItems =
  //         this.orderItemsStatuses.find((x) => x.id === this.order.statusItemsId)
  //           ?.name ?? '';
  //       this.order.statusPayment =
  //         this.orderPaymentStatuses.find(
  //           (x) => x.id === this.order.statusPaymentId
  //         )?.name ?? '';
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     this.nzMessageService.error('Error loading data');
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  /**
   * Life cycle method
   */
  ngOnInit() {
    console.log('OrdersDraftPageComponent: ngOnInit');
    this.facade.initialize();
  }
}
