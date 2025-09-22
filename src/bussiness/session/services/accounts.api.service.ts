import { Injectable } from '@angular/core';

import { Account, AccountRole } from '@bussiness/users/interfaces/users.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { StorageProp } from '@globals/types/storage.type';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService extends ApiBaseService {
  public account = new StorageProp<Account | null>(null, 'ACCOUNT_COOKIE');

  constructor() {
    super();
  }

  saveAccount(account: Account) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Accounts)
        .upsert(account, { onConflict: 'Email' })
        .select()
        .single();
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  saveAccountRoles(accountRoles: AccountRole[]) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.AccountRoles).upsert(accountRoles).select().single();
      return super.handleResponse(data as unknown as AccountRole[], error);
    });
  }

  getAccounts() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Accounts)
        .select(`*, Organization: ${SupabaseTables.Organizations}(*)`);
      return super.handleResponse(data as unknown as Account[], error);
    });
  }

  getAccount(email: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Accounts)
        .select(`*, Organization: ${SupabaseTables.Organizations}(*)`)
        .eq('Email', email)
        .maybeSingle();
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  getAccountRoles(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.AccountRoles)
        .select(`*, Role: ${SupabaseTables.Roles}(*)`)
        .eq('AccountId', id);
      return super.handleResponse(data as unknown as AccountRole[], error);
    });
  }

  deleteAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).update({ Deleted: true }).eq('id', id);
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  deleteAccountRoles(ids: number[]) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.AccountRoles).delete().in('id', ids);
      return super.handleResponse(null, error);
    });
  }
}
