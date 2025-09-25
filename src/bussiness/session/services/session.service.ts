import { Injectable } from '@angular/core';

import { SessionInfo } from '@bussiness/session/interfaces/session.interface';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { StorageProp } from '@globals/types/storage.type';

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

  get accountId() {
    return this.sessionInfo.value?.Account.id ?? '';
  }

  get locationId() {
    return this.sessionInfo.value?.Location.id ?? '';
  }

  get locationName() {
    return this.sessionInfo.value?.Location.Name ?? '';
  }

  async getToken() {
    return (await supabaseClient.auth.getSession()).data.session?.access_token;
  }
  
}
