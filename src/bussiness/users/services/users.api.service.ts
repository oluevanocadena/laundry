import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { SessionService } from '@bussiness/session/services/session.service';
import { Account } from '@bussiness/users/users.interfaces';
import { BusyProp } from '@globals/types/busy.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  accounts = new SubjectProp<Account[]>([]);

  constructor(
    public nzMessageService: NzMessageService,
    public sessionService: SessionService
  ) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al intentar realizar la acción! ⛔'
      );
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getUsers() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Accounts)
        .select(`*, Organization: ${SupabaseTables.Organizations}(*)`);
      if (error) throw error;
      this.accounts.value = data as unknown as Account[];
      return data;
    });
  }
}
