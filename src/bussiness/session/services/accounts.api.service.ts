import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Account } from '@bussiness/users/users.interfaces';
import { BusyProp } from '@globals/types/busy.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { StorageProp } from '@globals/types/storage.type';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  public table = 'Accounts';
  public tableOrganizations = 'Organizations';

  public account = new StorageProp<Account | null>(null, 'ACCOUNT_COOKIE');

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Session API] ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error('Ocurrió un error al realizar la acción');
      console.error('⛔ Error:', error);
      return error as any;
    } finally {
      this.busy.value = false;
    }
  }

  saveAccount(account: Account) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(account, { onConflict: 'Email' })
        .select()
        .single();
      if (error) throw error;
      return data;
    });
  }

  getAccounts() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select(`*, Organization: ${this.tableOrganizations}(*)`);
      if (error) throw error;
      return data;
    });
  }

  getAccount(email: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select(`*, Organization: ${this.tableOrganizations}(*)`)
        .eq('Email', email)
        .single();
      return data as unknown as Account;
    });
  }

  deleteAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .update({ Deleted: true })
        .eq('id', id);
      if (error) throw error;
      return data;
    });
  }
}
