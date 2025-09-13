import { SessionService } from '@bussiness/session/services/session.service';
import { CustomerRequest } from '../customers.interfaces';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import moment from 'moment';

export class CustomersQueryDomain {
  static buildQuery(request: CustomerRequest, client: SupabaseClient, sessionService: SessionService) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    let query = client
      .from(SupabaseTables.Customers)
      .select(`*`)
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Disabled', false);

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or(
        [`FullName.ilike.%${searchTerm}%`, `Phone.ilike.%${searchTerm}%`, `Address.ilike.%${searchTerm}%`].join(','),
      );
    }

    // Aplicar paginación
    query = query.range(from, to);

    // Aplicar ordenamiento (por defecto created_at descendente)
    const sortBy = request.sortBy || 'created_at';
    const sortOrder = request.sortOrder ? request.sortOrder === 'desc' : false;
    query = query.order(sortBy, { ascending: sortOrder });

    // Result Query
    return query;
  }

  static buildTotalCountQuery(request: CustomerRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Customers)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Disabled', false);

    return query;
  }
}
