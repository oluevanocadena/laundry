import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import moment from 'moment';

import { NzMessageService } from 'ng-zorro-antd/message';

import { CustomerPageTableColumns } from '@bussiness/customers/constants/customer.columns.constant';
import { CustomerDefaultTableFilter } from '@bussiness/customers/constants/customers.constants';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { Customer } from '@bussiness/customers/interfaces/customers.interfaces';
import { ICustomersRepository } from '@bussiness/customers/repository/customers.repository';
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
export class CustomersMonitorFacade extends FacadeBase {
  //Flag Management
  showDeleteCustomersModal = false;
  showDisableCustomersModal = false;

  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<PagedRequest>(CustomerDefaultTableFilter);
  columns: UITableColumn[] = [];

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteCustomersModal() },
    {
      label: 'Habilitar/Deshabilitar',
      icon: 'block',
      appearance: 'default',
      action: () => this.openDisableCustomersModal(),
    },
  ];

  constructor(
    public repo: ICustomersRepository,
    public draftFacade: CustomersDraftFacade,
    public router: Router,
    public sessionService: SessionService,
    public storageService: StorageService,
    private nzMessageService: NzMessageService,
  ) {
    super(repo);
    this.columns = this.storageService.get('CUSTOMERS_COLUMNS') || UtilsDomain.clone(CustomerPageTableColumns);
    this.fetchCustomers();
    this.bindEvents();
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.repo.pagedCustomers.value = null;
  }

  submitForm() {}

  /**
   * API Calls
   */
  fetchCustomers() {
    const pagination = this.tablePagination.value;
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.repo.getPaged({
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
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
    this.storageService.set('CUSTOMERS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: PagedRequest) {
    this.tableFilter.value = filter as PagedRequest;
    this.fetchCustomers();
  }

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchCustomers();
  }

  onNewCustomer() {
    this.router.navigate([routes.CustomerDraft]);
    this.draftFacade.customer.value = null;
  }

  onCustomerClick(customer: Customer) {
    this.draftFacade.customer.value = customer;
    this.router.navigate([routes.CustomerDraft]);
  }

  onDeleteCustomers() {
    const ids = this.selectedRows.map((customer) => customer.id!.toString());
    this.repo.deleteMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Clientes eliminados');
        this.fetchCustomers();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar los clientes');
      }
      this.showDeleteCustomersModal = false;
    });
  }

  onDisableCustomers() {
    const ids = this.selectedRows.map((customer) => customer.id!.toString());
    this.repo.toggleEnableMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Clientes deshabilitados');
        this.fetchCustomers();
      } else {
        this.nzMessageService.error('Ocurrió un error al deshabilitar los clientes');
      }
      this.showDisableCustomersModal = false;
    });
  }

  openDeleteCustomersModal() {
    this.showDeleteCustomersModal = true;
  }

  openDisableCustomersModal() {
    this.showDisableCustomersModal = true;
  }

  /**
   * Getters
   */
  get selectedRows() {
    return this.repo.pagedCustomers.value?.data.filter((customer) => customer.Checked) ?? [];
  }
}
