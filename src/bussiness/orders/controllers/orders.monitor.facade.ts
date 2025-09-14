import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import moment from 'moment';

import { OrderPageTableColumns } from '@bussiness/orders/constants/orders.columns.constant';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { SessionService } from '@bussiness/session/services/session.service';

import { OrderDefaultTableFilter } from '@bussiness/orders/constants/orders.constants';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilterBase>(OrderDefaultTableFilter);
  columns: UITableColumn[] = [];

  constructor(
    public api: OrdersApiService,
    public draftFacade: OrdersDraftFacade,
    public router: Router,
    public sessionService: SessionService,
    public storageService: StorageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.columns = this.storageService.get('ORDERS_COLUMNS') || UtilsDomain.clone(OrderPageTableColumns);
    this.fetchOrders();
    this.bindEvents();
  }

  bindEvents() {
    this.sessionService.sessionInfo.onChange((session) => {
      this.fetchOrders();
    });
  }

  submitForm() {}

  clearState() {
    this.api.pagedOrders.value = null;
  }

  /**
   * APi
   */

  fetchOrders() {
    const pagination = this.tablePagination.value; 
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.api.getPagedOrders({
      accountId: null,
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      locationId: this.sessionService?.locationId ?? null,
      dateFrom: starDate!,
      dateTo: endDate!,
      select: this.tableFilter.value?.select ?? null,
      search: this.tableFilter.value?.search ?? null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    });
  }

  /**
   * UI Events
   */

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('ORDERS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchOrders();
  }

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter; 
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
