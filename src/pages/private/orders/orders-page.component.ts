import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { OrdersMonitorFacade } from '@bussiness/orders/controllers/orders.monitor.facade';
import { DeliveryDomain } from '@bussiness/orders/domains/delivery.domain';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';
import { TypeFilterShow } from '@components/common/table-filters/table-filters.component';

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
  deliveryDomain = DeliveryDomain;

  showType: TypeFilterShow = {
    calendar: true,
    search: true,
    sort: true,
  };

  constructor(
    public facade: OrdersMonitorFacade,
    public notificationsRealtimeService: NotificationsRealtimeService,
    public cdr: ChangeDetectorRef,
  ) {
    super();
  }

  onColumnsChange(columns: UITableColumn[]) {
    this.facade.onColumnsChange(columns);
    this.cdr.detectChanges();
  }

  /**
   * Getters
   */

  get data() {
    return this.facade.api.pagedOrders.value?.data ?? [];
  }

  get rowCount() {
    return this.facade.api.pagedOrders.value?.count ?? 0;
  }

  get busy() {
    return this.facade.api.busy.value;
  }

  get columns() {
    return this.facade.columns;
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
