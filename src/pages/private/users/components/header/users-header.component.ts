import { Component, OnInit } from '@angular/core';
import moment from 'moment';

import { AccountsDraftFacade } from '@bussiness/users/controllers/users.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'users-header',
  standalone: false,
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.scss'],
})
export class UsersHeaderComponent extends HelperPage implements OnInit {
  now = moment().locale('es').toDate().toString();

  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get busy() {
    return this.facade.api.busy.value;
  }

  get account() {
    return this.facade.account.value;
  }

  get dateCreated(): string {
    return this.facade.account.value?.created_at || this.now;
  }

  get accountStatus() {
    return this.facade.account.value?.Disabled ? 'Inactivo' : 'Activo';
  }

  get accountStatusAppearance() {
    return this.facade.account.value?.Disabled ? 'error' : 'success';
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}
