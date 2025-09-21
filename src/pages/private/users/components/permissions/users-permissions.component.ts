import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '@bussiness/session/enums/role.enums';
import { SessionService } from '@bussiness/session/services/session.service';
import { AccountsDraftFacade } from '@bussiness/users/controllers/users.draft.facade';
import { Role } from '@bussiness/users/interfaces/users.roles.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'users-permissions',
  standalone: false,
  templateUrl: './users-permissions.component.html',
  styleUrls: ['./users-permissions.component.scss'],
})
export class UsersPermissionsComponent extends HelperPage implements OnInit {
  constructor(public facade: AccountsDraftFacade, public sessionService: SessionService) {
    super();
  }

  isRoleOwner(role: Role) {
    return parseInt(role.id || '0') === RoleEnum.Owner;
  }

  /**
   * Getters
   */

  get roles() {
    return this.facade.roles.value;
  }

  get currentUserIsOwner() {
    return this.sessionService.sessionInfo.value?.Account?.IsOwner === true;
  }

  get isEdition() {
    return this.facade.edition;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
