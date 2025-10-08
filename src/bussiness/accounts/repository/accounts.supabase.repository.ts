import { Injectable } from '@angular/core';

import { AccountsQueryDomain } from '@bussiness/accounts/domains/accounts.query.domain';
import { Account, AccountRequest, AccountRole, InviteUserRequest } from '@bussiness/accounts/interfaces/users.interfaces';
import { IAccountsRepository, SaveAccountOptions } from '@bussiness/accounts/repository/accounts.repository';
import { SetPasswordRequest } from '@bussiness/session/interfaces/session.interface';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { EdgeFunctionResponse, PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class AccountsSupabaseRepository extends SupabaseBaseApiService implements IAccountsRepository {
  public account = new SubjectProp<ResponseResult<Account>>(null);
  public accounts = new SubjectProp<ResponseResult<Account[]>>(null);
  public pagedAccounts = new SubjectProp<PagedResults<Account>>(null);
  public currentAccount = new StorageProp<Account | null>(null, 'ACCOUNT_COOKIE');

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<Account[]>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildGetAllQuery(this.client, this.sessionService.organizationId);
      const { data, error } = await query;
      this.accounts.value = super.handleResponse(data as unknown as Account[], error);
      return this.accounts.value;
    }, 'Fetching Accounts');
  }

  getById(id: string): Promise<ResponseResult<Account> | null> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildGetByIdQuery(this.client, id);
      const { data, error } = await query;
      this.account.value = super.handleResponse(data as unknown as Account, error);
      return this.account.value;
    }, 'Fetching Account');
  }

  getByEmail(email: string): Promise<ResponseResult<Account> | null> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildGetByEmailQuery(this.client, email);
      const { data, error } = await query;
      this.account.value = super.handleResponse(data as unknown as Account, error);
      return this.account.value;
    }, 'Fetching Account');
  }

  async save(account: Account, options?: SaveAccountOptions): Promise<ResponseResult<Account>> {
    if (options?.accountRoles && options.accountRoles.length > 0) {
      return this._saveAccountWithRoles(account, options.accountRoles, options.sendInvitation ?? true);
    }
    return this._saveOrUpdate(account);
  }

  async update(account: Account, options?: SaveAccountOptions): Promise<ResponseResult<Account>> {
    if (options?.accountRoles && options.accountRoles.length > 0) {
      return this._saveAccountWithRoles(account, options.accountRoles, false);
    }
    return this._saveOrUpdate(account);
  }

  async delete(id: string): Promise<ResponseResult<Account>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildDeleteQuery(this.client, id);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as Account, error);
    }, 'Deleting Account');
  }

  getPaged(request: AccountRequest): Promise<ResponseResult<Account[]>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildPagedQuery(request, this.client);
      const countQuery = AccountsQueryDomain.buildTotalCountQuery(request, this.client);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;

      const accounts = (data as unknown as Account[]) || [];
      accounts.forEach((account) => {
        account.Checked = false;
      });

      this.pagedAccounts.value = {
        data: (data as unknown as Account[]) ?? [],
        count: totalCount,
      };

      return super.handleResponse(data as unknown as Account[], error, undefined, totalCount);
    }, 'Fetching Accounts');
  }

  deleteMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildDeleteManyQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as void, error);
    }, 'Deleting Accounts');
  }

  toggleEnableMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildToggleEnableManyQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as void, error);
    });
  }

  getAccountRoles(accountId: string): Promise<ResponseResult<AccountRole[]>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildGetAccountRolesQuery(this.client, accountId);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as AccountRole[], error);
    }, 'Fetching Account Roles');
  }

  saveAccountRoles(accountRoles: AccountRole[]): Promise<ResponseResult<AccountRole[]>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildUpsertAccountRolesQuery(this.client, accountRoles);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as AccountRole[], error);
    }, 'Saving Account Roles');
  }

  deleteAccountRoles(ids: number[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildDeleteAccountRolesQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as void, error);
    }, 'Deleting Account Roles');
  }

  private _saveAccountWithRoles(
    account: Account,
    accountRoles: AccountRole[],
    sendInvitation: boolean = true,
  ): Promise<ResponseResult<Account>> {
    return this.executeWithBusy(async () => {
      let error = null;

      // Verificar si existe el usuario
      const existingUserQuery = AccountsQueryDomain.buildCheckExistingUserQuery(this.client, account.Email);
      const { data: existingUser, error: existingUserError } = await existingUserQuery;
      error = existingUserError;

      let accountId = account.id ?? existingUser?.id;

      if (existingUser) {
        // Si el usuario existe, solo actualizar sus datos
        const updateQuery = AccountsQueryDomain.buildUpdateAccountQuery(this.client, accountId!, account);
        const { error: accountSavedError } = await updateQuery;
        error = accountSavedError;
      } else {
        // Si el usuario no existe, crearlo
        const insertQuery = AccountsQueryDomain.buildInsertAccountQuery(this.client, account);
        const { data: accountSaved, error: accountSavedError } = await insertQuery;
        accountId = accountSaved?.id;
        error = accountSavedError;

        // Enviar invitación por email si se solicita
        if (sendInvitation) {
          const response = await this.inviteUser({ action: 'invite', email: account.Email });
          if (response?.error) {
            error = response.error;
            // Eliminar la cuenta si falla el envío de invitación
            await AccountsQueryDomain.buildHardDeleteQuery(this.client, accountId!);
            return super.handleResponse(null as unknown as Account, response.error);
          }
        }
      }

      // Gestionar roles si hay
      if (accountRoles.length > 0) {
        // Eliminar todos los roles previos
        const deleteRolesQuery = AccountsQueryDomain.buildDeleteAccountRolesByAccountIdQuery(this.client, accountId!);
        const { error: accountRolesDeletedError } = await deleteRolesQuery;
        error = accountRolesDeletedError;

        // Insertar nuevos roles
        const rolesToInsert = accountRoles.map((role) => {
          const { id, ...roleWithoutId } = role;
          return {
            ...roleWithoutId,
            AccountId: accountId!,
            OrganizationId: this.sessionService.organizationId,
          };
        });

        const insertRolesQuery = AccountsQueryDomain.buildInsertAccountRolesQuery(this.client, rolesToInsert);
        const { error: accountRolesError } = await insertRolesQuery;
        error = accountRolesError;
      }

      this.clearAllCaches();
      return super.handleResponse({ id: accountId } as Account, error ?? null);
    }, 'Saving Account');
  }

  private _saveOrUpdate(account: Account) {
    return this.executeWithBusy(async () => {
      const query = AccountsQueryDomain.buildSaveOrUpdateQuery(this.client, account);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data, error);
    }, 'Saving Account');
  }

  inviteUser(request: InviteUserRequest): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction('invite-user', request);
  }

  changePassword(request: SetPasswordRequest): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction<SetPasswordRequest>('set-password', request);
  }

  hardDelete(email: string): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction('delete-user', { email });
  }

  disable(email: string): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction('disable-user', { action: 'disable', email });
  }

  enable(email: string): Promise<EdgeFunctionResponse> {
    return this.callEdgeFunction('disable-user', { action: 'enable', email });
  }
}
