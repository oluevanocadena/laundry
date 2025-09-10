import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';

import { OrderPageTableColumns } from '@bussiness/orders/constants/orders.columns.constant';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { SessionService } from '@bussiness/session/services/session.service';

import {
  UIDefaultTableFilter,
  UIDefaultTablePagination,
  UITableConstants,
} from '@globals/constants/supabase-tables.constants';
import { UITableFilter, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilter>(UIDefaultTableFilter);
  columns = OrderPageTableColumns;

  constructor(
    public api: OrdersApiService,
    public draftFacade: OrdersDraftFacade,
    public router: Router,
    public sessionService: SessionService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.fetchOrders();
  }

  bindEvents() {}

  submitForm() {}

  clearState() {
    this.api.pagedOrders.value = null;
  }

  /**
   * APi
   */

  fetchOrders() {
    const pagination = this.tablePagination.value;
    this.api.getPagedOrders({
      accountId: this.sessionService.accountId,
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      locationId: this.sessionService?.locationId ?? null,
      dateFrom: this.tableFilter.value?.dateFrom ?? null,
      dateTo: this.tableFilter.value?.dateTo ?? null,
      statusId: this.tableFilter.value?.statusId ?? null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    console.log('👉🏽 onTablePaginationChange', filter);
    this.fetchOrders();
  }

  onOrderClick(order: Order) {
    this.draftFacade.selectedOrder.value = order;
    this.router.navigate([routes.OrderDraft]);
  }

  onNewOrder() {
    this.draftFacade.clearState();
    this.router.navigate([routes.OrderDraft]);
  }
}
