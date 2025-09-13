import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import moment from 'moment';

import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { CustomerDefaultTableFilter } from '@globals/constants/customers.constants';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { StorageService } from '@services/common/storage.service';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { CustomerPageTableColumns } from '../constants/customer.columns.constant';

@Injectable({
  providedIn: 'root',
})
export class CustomersMonitorFacade extends FacadeBase {
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilterBase>(CustomerDefaultTableFilter);
  columns: UITableColumn[] = [];

  constructor(
    public api: CustomersApiService,
    public draftFacade: CustomersDraftFacade,
    public router: Router,
    public sessionService: SessionService,
    public storageService: StorageService,
  ) {
    super(api);
    this.columns = this.storageService.get('CUSTOMERS_COLUMNS') || UtilsDomain.clone(CustomerPageTableColumns);
    this.fetchCustomers();
    this.bindEvents();
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.api.pagedCustomers.value = null;
  }

  submitForm() {}

  /**
   * API Calls
   */
  fetchCustomers() {
    const pagination = this.tablePagination.value; 
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.api.getPagedCustomers({
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
    this.storageService.set('CUSTOMERS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    this.tableFilter.value = filter as UITableFilterBase;
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
}
