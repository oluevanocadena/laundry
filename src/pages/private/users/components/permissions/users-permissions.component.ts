import { Component, OnInit } from '@angular/core';
import { AccountsDraftFacade } from '@bussiness/users/controllers/users.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'users-permissions',
  standalone: false,
  templateUrl: './users-permissions.component.html',
  styleUrls: ['./users-permissions.component.scss'],
})
export class UsersPermissionsComponent extends HelperPage implements OnInit {
  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  /**
   * Getters
   */

  get roles() {
    return this.facade.roles.value;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
