import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { AccountsPageTableColumns } from '@bussiness/accounts/constants/accounts.columns.constant';
import { AccountsDefaultTableFilter } from '@bussiness/accounts/constants/accounts.constants';
import { Account } from '@bussiness/accounts/interfaces/users.interfaces';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableActions, UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

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
  tableFilter = new SubjectProp<UITableFilterBase>(AccountsDefaultTableFilter);
  columns = AccountsPageTableColumns;
  selectedAccount = new StorageProp<Account>(null, 'ACCOUNT_SELECTED');

  constructor(public repoAccounts: IAccountsRepository, public router: Router, public storageService: StorageService) {
    super(repoAccounts);
    this.columns = this.storageService.get('USERS_COLUMNS') || UtilsDomain.clone(AccountsPageTableColumns);
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
    this.repoAccounts.getPaged({
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
    return this.repoAccounts.pagedAccounts.value?.data.filter((account) => account.Checked) ?? [];
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
