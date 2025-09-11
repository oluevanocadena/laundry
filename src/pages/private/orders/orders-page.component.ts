import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

import { OrdersMonitorFacade } from '@bussiness/orders/controllers/orders.monitor.facade';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { UITableConstants } from '@globals/constants/supabase-tables.constants';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent extends HelperPage implements AfterViewInit {
  //Domains
  ordersDomain = OrdersDomain;

  constructor(
    public facade: OrdersMonitorFacade,
    public notificationsRealtimeService: NotificationsRealtimeService,
    public cdr: ChangeDetectorRef,
  ) {
    super();
  }

  /**
   * Getters
   */

  deliveryTypeName(item: Order): string {
    switch (item?.DeliveryType) {
      case DeliveryTypesEnum.Showroom:
        return 'Venta de mostrador';
      case DeliveryTypesEnum.Delivery:
        return 'Entrega a domicilio';
      case DeliveryTypesEnum.Pickup:
        return 'Recolección en sucursal';
    }
    return '';
  }

  get data() {
    return this.facade.api.pagedOrders.value?.data ?? [];
  }

  get rowCount() {
    return this.facade.api.pagedOrders.value?.count ?? 0;
  }

  get busy() {
    return this.facade.api.busy.value;
  }

  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    if (this.facade.tablePagination.value) {
      this.facade.tablePagination.value.pageSize = UITableConstants.DefaultPageSize;
    }
    this.facade.initialize();
    this.facade.api.busy.onChange((value) => {
      this.cdr.detectChanges();
    });
    this.notificationsRealtimeService.onReceiveNotification.onChange((value) => {
      this.facade.fetchOrders();
    });
  }
}
