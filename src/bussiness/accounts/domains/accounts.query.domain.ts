import { SupabaseClient } from '@supabase/supabase-js';

import { AccountRequest } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { Account, AccountRole } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class AccountsQueryDomain {
  static buildGetByIdQuery(client: SupabaseClient, id: string) {
    return client
      .from(SupabaseTables.Accounts)
      .select(`*, Organization: ${SupabaseTables.Organizations}(*)`)
      .eq('id', id)
      .eq('Deleted', false)
      .single();
  }

  static buildDeleteByEmailQuery(client: SupabaseClient, email: string) {
    return client.from(SupabaseTables.Accounts).delete().eq('Email', email).select().single();
  }

  static buildGetByEmailQuery(client: SupabaseClient, email: string) {
    return client
      .from(SupabaseTables.Accounts)
      .select(`*, Organization: ${SupabaseTables.Organizations}(*)`)
      .eq('Email', email)
      .maybeSingle();
  }

  static buildGetAllQuery(client: SupabaseClient, organizationId?: string) {
    let query = client
      .from(SupabaseTables.Accounts)
      .select(
        `*, 
        Organization: ${SupabaseTables.Organizations}(*), 
        AccountRoles: ${SupabaseTables.AccountRoles}(*, Role: ${SupabaseTables.Roles}(*))`,
      )
      .eq('Deleted', false);

    if (organizationId) {
      query = query.eq('OrganizationId', organizationId);
    }

    return query.order('FullName', { ascending: true });
  }

  static buildSaveOrUpdateQuery(client: SupabaseClient, account: Account) {
    return client.from(SupabaseTables.Accounts).upsert(account, { onConflict: 'Email' }).select().single();
  }

  static buildCheckExistingUserQuery(client: SupabaseClient, email: string) {
    return client.from(SupabaseTables.Accounts).select('*').eq('Email', email).maybeSingle();
  }

  static buildInsertAccountQuery(client: SupabaseClient, account: Account) {
    return client.from(SupabaseTables.Accounts).insert(account).select().single();
  }

  static buildUpdateAccountQuery(client: SupabaseClient, accountId: string, account: Account) {
    return client.from(SupabaseTables.Accounts).update(account).eq('id', accountId).select().single();
  }

  static buildDeleteQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Accounts).update({ Deleted: true }).eq('id', id).select().single();
  }

  static buildHardDeleteQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Accounts).delete().eq('id', id);
  }

  static buildDisableQuery(client: SupabaseClient, id: string, state: boolean) {
    return client.from(SupabaseTables.Accounts).update({ Disabled: state }).eq('id', id).select().single();
  }

  static buildPagedQuery(request: AccountRequest, client: SupabaseClient) {
    let query = client
      .from(SupabaseTables.Accounts)
      .select(`*, Organization: ${SupabaseTables.Organizations}(*)`)
      .eq('Deleted', false);

    if (request.search) {
      query = query.or(`FullName.ilike.%${request.search}%,Email.ilike.%${request.search}%`);
    }

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.organizationId) {
      query = query.eq('OrganizationId', request.organizationId);
    }

    const orderColumn = request.sortBy || 'FullName';
    const orderDirection = request.sortOrder || 'asc';
    query = query.order(orderColumn, { ascending: orderDirection === 'asc' });

    if (request.page !== undefined && request.pageSize !== undefined) {
      const from = (request.page - 1) * request.pageSize;
      const to = from + request.pageSize - 1;
      query = query.range(from, to);
    }

    return query;
  }

  static buildTotalCountQuery(request: AccountRequest, client: SupabaseClient) {
    let query = client.from(SupabaseTables.Accounts).select('*', { count: 'exact', head: true }).eq('Deleted', false);

    if (request.search) {
      query = query.or(`FullName.ilike.%${request.search}%,Email.ilike.%${request.search}%`);
    }

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.organizationId) {
      query = query.eq('OrganizationId', request.organizationId);
    }

    return query;
  }

  static buildDeleteManyQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Accounts).update({ Deleted: true }).in('id', ids).select();
  }

  static buildToggleEnableManyQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Accounts).select('id, Disabled').in('id', ids).eq('Deleted', false);
  }

  // AccountRoles queries
  static buildGetAccountRolesQuery(client: SupabaseClient, accountId: string) {
    return client.from(SupabaseTables.AccountRoles).select(`*, Role: ${SupabaseTables.Roles}(*)`).eq('AccountId', accountId);
  }

  static buildUpsertAccountRolesQuery(client: SupabaseClient, accountRoles: AccountRole[]) {
    return client.from(SupabaseTables.AccountRoles).upsert(accountRoles).select();
  }

  static buildDeleteAccountRolesQuery(client: SupabaseClient, ids: number[]) {
    return client.from(SupabaseTables.AccountRoles).delete().in('id', ids);
  }

  static buildDeleteAccountRolesByAccountIdQuery(client: SupabaseClient, accountId: string) {
    return client.from(SupabaseTables.AccountRoles).delete().eq('AccountId', accountId);
  }

  static buildInsertAccountRolesQuery(client: SupabaseClient, accountRoles: AccountRole[]) {
    return client.from(SupabaseTables.AccountRoles).insert(accountRoles).select();
  }
}
