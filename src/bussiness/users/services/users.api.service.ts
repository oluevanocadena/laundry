import { Injectable } from '@angular/core';

import { SessionService } from '@bussiness/session/services/session.service';
import { Account, UsersRequest } from '@bussiness/users/interfaces/users.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UsersQueryDomain } from '../domains/users.query.domain';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends ApiBaseService {
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
        .select(`*, Organization: ${SupabaseTables.Organizations}(*)`)
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Deleted', false);

      this.accounts.value = data as unknown as Account[];
      return super.handleResponse(data as unknown as Account[], error);
    });
  }
}
