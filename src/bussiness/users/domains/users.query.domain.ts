import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';
import { UsersRequest } from '../interfaces/users.interfaces';

export class UsersQueryDomain {
  static buildQuery(request: UsersRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Accounts)
      .select(
        `*, 
        Organization: ${SupabaseTables.Organizations}(*), 
        AccountRoles: ${SupabaseTables.AccountRoles}(*, Role: ${SupabaseTables.Roles}(*))`,
      )
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or(
        [`FullName.ilike.%${searchTerm}%`, `Email.ilike.%${searchTerm}%`, `Phone.ilike.%${searchTerm}%`].join(','),
      );
    }

    if (request.sortBy) {
      query = query.order(request.sortBy, { ascending: request.sortOrder === 'asc' });
    }

    return query;
  }

  static buildTotalCountQuery(request: UsersRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Accounts)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
    return query;
  }
}
