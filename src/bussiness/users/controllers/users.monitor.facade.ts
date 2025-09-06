import { Injectable } from '@angular/core';
import { FacadeBase } from '@globals/types/facade.base';
import { UsersApiService } from '../services/users.api.service';
import { routes } from '@app/routes';
import { Router } from '@angular/router'; 
import { Account } from '../users.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersMonitorFacade extends FacadeBase {
  constructor(public api: UsersApiService, public router: Router) {
    super(api);
  }

  override initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /*
   * API Calls
   */

  fetchUsers() {
    this.api.getUsers();
  }

  /**
   * UI Events
   */

  onNewUser() {
    this.router.navigate([routes.UserDraft]);
  }

  onUserClick(user: Account) {
    this.router.navigate([routes.UserDraft]);
  }


}
