import { Injectable } from '@angular/core';

import { Account, AccountRole, InviteUserRequest, UsersRequest } from '@bussiness/users/interfaces/users.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { EdgeFunctionResponse, PagedResults } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UsersQueryDomain } from '../domains/users.query.domain';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService extends ApiBaseService {
  accounts = new SubjectProp<Account[]>([]);
  pagedUsers = new SubjectProp<PagedResults<Account>>(null);

  constructor() {
    super();
  }

  getPagedUsers(request: UsersRequest) {
    return this.executeWithBusy(async () => {
      const query = UsersQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = UsersQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      this.pagedUsers.value = {
        data: (data as unknown as Account[]) ?? [],
        count: totalCount,
      };
      return super.handleResponse(data, error);
    }, 'Fetching Users');
  }

  getUsers() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Accounts)
        .select(
          `*, 
          Organization: ${SupabaseTables.Organizations}(*), 
          AccountRoles: ${SupabaseTables.AccountRoles}(*, Role: ${SupabaseTables.Roles}(*))`,
        )
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Deleted', false);

      this.accounts.value = data as unknown as Account[];
      return super.handleResponse(data as unknown as Account[], error);
    });
  }

  saveAccount(account: Account, accountRoles: AccountRole[]) {
    return this.executeWithBusy(async () => {
      let error = null;
      // Verificar si existe el usuario
      const { data: existingUser, error: existingUserError } = await this.client
        .from(SupabaseTables.Accounts)
        .select('*')
        .eq('Email', account.Email)
        .maybeSingle();

      error = existingUserError;
      let accountId = account.id ?? existingUser?.id;

      if (existingUser) {
        // Si el usuario existe, solo actualizar sus datos
        const { data: accountSaved, error: accountSavedError } = await this.client
          .from(SupabaseTables.Accounts)
          .update(account)
          .eq('id', accountId)
          .select()
          .single();
      } else {
        // Si el usuario no existe, crearlo
        const { data: accountSaved, error: accountSavedError } = await this.client
          .from(SupabaseTables.Accounts)
          .insert(account)
          .select()
          .single();
        console.log('👉🏽 accountSaved', accountSaved);
        accountId = accountSaved?.id;

        // Enviar invitación por email
        const response = await this.inviteUser({ action: 'invite', email: account.Email });
        if (response?.error) {
          error = response.error;
          // Eliminar la cuenta si falla el envío de invitación
          await this.client.from(SupabaseTables.Accounts).delete().eq('id', accountId);
          return super.handleResponse(null, response.error);
        }
      }

      if (accountRoles.length > 0) {
        //Delete first all account roles
        const { data, error: accountRolesDeletedError } = await this.client
          .from(SupabaseTables.AccountRoles)
          .delete()
          .eq('AccountId', accountId);
        error = accountRolesDeletedError;

        // Insert new account roles
        accountRoles.forEach(async (role) => {
          role.AccountId = accountId;
          role.OrganizationId = this.sessionService.organizationId;
          const { data: accountRolesSaved, error: accountRolesError } = await this.client
            .from(SupabaseTables.AccountRoles)
            .upsert(role)
            .select()
            .single();
          error = accountRolesError;
        });
      }

      return super.handleResponse(accountId as unknown as Account, error ?? null);
    });
  }

  async inviteUser(request: InviteUserRequest): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction('invite-user', request);
  }

  getAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).select('*').eq('id', id).single();
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  changePassword(id: string, password: string) {
    return this.callEdgeFunction('change-password', { id, password });
  }

  deleteAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).update({ Deleted: true }).eq('id', id).single();
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  disableAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).update({ Disabled: true }).eq('id', id).single();
      return super.handleResponse(data as unknown as Account, error);
    });
  }

  enableAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).update({ Disabled: false }).eq('id', id).single();
      return super.handleResponse(data as unknown as Account, error);
    });
  }
}
