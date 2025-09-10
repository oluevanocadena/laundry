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
import { UITableFilter, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilterBase>(UIDefaultTableFilter);
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
    console.log('👉🏽 fetchOrders', this.tableFilter.value);
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.api.getPagedOrders({
      accountId: null,
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      locationId: this.sessionService?.locationId ?? null,
      dateFrom: starDate!,
      dateTo: endDate!,
      statusId: null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    });
  }

  /**
   * UI Events
   */

  onFiltersChange(filter: UITableFilterBase) {
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchOrders();
  }

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
