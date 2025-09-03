import { Injectable } from '@angular/core';
import { StorageProp } from '../../../globals/types/storage.type';
import { SessionInfo } from '../session.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public SessionInfo = new StorageProp<SessionInfo>(null, 'USER_SESSION_INFO');

  constructor() {}

  /**
   * Getters
   */

  get isLoggedIn() {
    return this.SessionInfo.value?.Session;
  }

  get organizationId() {
    return this.SessionInfo.value?.Account.OrganizationId ?? '';
  }
}
