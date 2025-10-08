import { Component, OnInit } from '@angular/core';
import moment from 'moment';

import { AccountsDraftFacade } from '@bussiness/accounts/controllers/accounts.draft.facade';
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
    return this.facade.repoAccounts.busy.value;
  }

  get account() {
    return this.facade.account.value;
  }

  get verifiedEmail() {
    return this.facade.account.value?.VerifiedEmail === true;
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

  get canSave(): boolean {
    return this.facade.formGroup.valid && (this.facade.roles.value || []).some((role) => role.Checked);
  }

  get canSendInvitation() {
    return this.facade.account.value?.invitation_sent === false;
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}
