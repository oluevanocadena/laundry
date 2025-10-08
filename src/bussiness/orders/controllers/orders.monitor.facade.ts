import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import moment from 'moment';

import { NzMessageService } from 'ng-zorro-antd/message';

import { OrderPageTableColumns } from '@bussiness/orders/constants/orders.columns.constant';
import { OrderDefaultTableFilter } from '@bussiness/orders/constants/orders.constants';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrdersSupabaseRepository } from '@bussiness/orders/repository/orders.supabase.repository';
import { SessionService } from '@bussiness/session/services/session.service';

import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { PagedRequest } from '@globals/interfaces/requests.interface';
import { UITableActions, UITableColumn, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersMonitorFacade extends FacadeBase {
  //Flag Management
  showDeleteOrdersModal = false;
  showDisableOrdersModal = false;

  showType: UITypeFilterShow = {
    calendar: true,
    columns: false,
    search: true,
    sort: true,
  };

  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<PagedRequest>(OrderDefaultTableFilter);
  columns: UITableColumn[] = [];

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteOrdersModal() },
    {
      label: 'Habilitar/Deshabilitar',
      icon: 'block',
      appearance: 'default',
      action: () => this.openDisableOrdersModal(),
    },
  ];

  constructor(
    public api: OrdersSupabaseRepository,
    public draftFacade: OrdersDraftFacade,
    public router: Router,
    public sessionService: SessionService,
    public storageService: StorageService,
    private nzMessageService: NzMessageService,
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

    this.api.getPaged({
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
    this.storageService.set('ORDERS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: PagedRequest) {
    this.tableFilter.value = filter as PagedRequest;
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

  onDeleteOrders() {
    const ids = this.selectedRows.map((order) => order.id!.toString());
    this.api.deleteMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Pedidos eliminados');
        this.fetchOrders();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar los pedidos');
      }
      this.showDeleteOrdersModal = false;
    });
  }

  onDisableOrders() {
    const ids = this.selectedRows.map((order) => order.id!.toString());
    this.api.toggleEnableMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Pedidos deshabilitados');
        this.fetchOrders();
      } else {
        this.nzMessageService.error('Ocurrió un error al deshabilitar los pedidos');
      }
      this.showDisableOrdersModal = false;
    });
  }

  openDeleteOrdersModal() {
    this.showDeleteOrdersModal = true;
  }

  openDisableOrdersModal() {
    this.showDisableOrdersModal = true;
  }

  get selectedRows() {
    return this.api.pagedOrders.value?.data?.filter((order) => order.Checked) ?? [];
  }
}
