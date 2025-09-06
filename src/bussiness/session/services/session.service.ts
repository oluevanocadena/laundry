import { Injectable } from '@angular/core';
import { StorageProp } from '@globals/types/storage.type';
import { SessionInfo } from '../session.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public sessionInfo = new StorageProp<SessionInfo>(null, 'USER_SESSION_INFO');

  constructor() {}

  clearSession() {
    this.sessionInfo.value = null;
  }

  /**
   * Getters
   */

  get isLoggedIn() {
    return this.sessionInfo.value?.Session;
  }

  get organizationId() {
    return this.sessionInfo.value?.Account.OrganizationId ?? '';
  }
}
