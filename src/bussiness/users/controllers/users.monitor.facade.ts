import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { UsersPageTableColumns } from '@bussiness/users/constants/users.columns.constant';
import { UsersDefaultTableFilter } from '@bussiness/users/constants/users.constants';
import { Account } from '@bussiness/users/interfaces/users.interfaces';
import { AccountsApiService } from '@bussiness/users/services/users.api.service';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableActions, UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';
import { StorageProp } from '@globals/types/storage.type';

@Injectable({
  providedIn: 'root',
})
export class AccountsMonitorFacade extends FacadeBase {
  // Flag Management
  showDeleteUsersModal = false;

  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  segments: NzSegmentedOption[] = [
    { label: 'Todos', value: '0' },
    { label: 'Activos', value: 'true' },
    { label: 'Inactivos', value: 'false' },
  ];

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteUsersModal() },
  ];

  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilterBase>(UsersDefaultTableFilter);
  columns = UsersPageTableColumns;
  selectedAccount = new StorageProp<Account>(null, 'ACCOUNT_SELECTED');

  constructor(public api: AccountsApiService, public router: Router, public storageService: StorageService) {
    super(api);
    this.columns = this.storageService.get('USERS_COLUMNS') || UtilsDomain.clone(UsersPageTableColumns);
    this.fetchUsers();
    this.bindEvents();
  }

  override initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /*
   * API Calls
   */

  fetchUsers() {
    this.api.getPagedUsers({
      page: this.tablePagination.value?.page ?? UITableConstants.DefaultPage,
      pageSize: this.tablePagination.value?.pageSize ?? UITableConstants.DefaultPageSize,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
      search: this.tableFilter.value?.search ?? null,
      disabled: this.getSegmentDisabled(this.tableFilter.value?.segment ?? '0'),
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchUsers();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('USERS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchUsers();
  }

  onNewUser() {
    this.selectedAccount.value = null;
    this.router.navigate([routes.UserDraft]);
  }

  onUserClick(user: Account) {
    this.selectedAccount.value = user;
    this.router.navigate([routes.UserDraft]);
  }

  onDeleteUsers() {
    console.log('👉🏽 delete users', this.selectedRows);
  }

  openDeleteUsersModal() {
    this.showDeleteUsersModal = true;
  }

  /**
   * Getters
   */

  get selectedRows() {
    return this.api.pagedUsers.value?.data.filter((user) => user.Checked) ?? [];
  }

  getSegmentDisabled(segment: string): boolean | null {
    switch (segment) {
      case '0':
        return null;
      case '1':
        return true;
      case '2':
        return false;
      default:
        return null;
    }
  }
}
