import { Injectable } from '@angular/core';

import { Role } from '@bussiness/users/interfaces/users.roles.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SessionService } from '@bussiness/session/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService extends ApiBaseService {
  constructor() {
    super();
  }

  getRoles() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Roles)
        .select('*')
        .eq('Deleted', false)
        .order('id', { ascending: true });
      return super.handleResponse(data as unknown as Role[], error);
    });
  }
}
