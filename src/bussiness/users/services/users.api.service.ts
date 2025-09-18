import { Injectable } from '@angular/core';

import { SessionService } from '@bussiness/session/services/session.service';
import { Account, UsersRequest } from '@bussiness/users/interfaces/users.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UsersQueryDomain } from '../domains/users.query.domain';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService extends ApiBaseService {
  accounts = new SubjectProp<Account[]>([]);
  pagedUsers = new SubjectProp<PagedResults<Account>>(null);

  constructor(public sessionService: SessionService) {
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

  saveAccount(account: Account) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).upsert(account).select().single();

      //Comporobar en aith supabase Auhentiucation no table si existe el usuario, si no creatlo
      const { data: existingUser, error: existingUserError } = await this.client.auth.admin.getUserById(account.Email);
      if (existingUserError) {
        return super.handleResponse(null, existingUserError);
      }
      if (!existingUser) {
        const { data, error } = await this.client.auth.admin.createUser({
          email: account.Email,
          password: UtilsDomain.generateRandomString(10),
        });
      }

      return super.handleResponse(data as unknown as Account, error);
    });
  }

  getAccount(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Accounts).select('*').eq('id', id).single();
      return super.handleResponse(data as unknown as Account, error);
    });
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
