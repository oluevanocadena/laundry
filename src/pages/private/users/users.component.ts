import { AfterViewInit, Component } from '@angular/core';
import { AccountsMonitorFacade } from '@bussiness/accounts/controllers/accounts.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersPageComponent extends HelperPage implements AfterViewInit {
  constructor(public facade: AccountsMonitorFacade) {
    super();
  }
  /**
   * Getters
   */

  get rowCount() {
    return this.facade.repoAccounts.pagedAccounts.value?.count ?? 0;
  }

  get columns() {
    return this.facade.columns;
  }

  get data() {
    return this.facade.repoAccounts.pagedAccounts.value?.data ?? [];
  }

  get busy() {
    return this.facade.repoAccounts.busy.value;
  }

  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    this.facade.fetchUsers();
  }
}
