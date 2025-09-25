import { SupabaseClient } from '@supabase/supabase-js';

import { ProductCategoryRequest } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class ProductCategoriesQueryDomain {
  static buildQuery(request: ProductCategoryRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.ProductCategories)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or([`Name.ilike.%${searchTerm}%`].join(','));
    }

    if (request.sortBy) {
      query = query.order(request.sortBy, { ascending: request.sortOrder === 'asc' });
    }

    return query;
  }

  static buildTotalCountQuery(request: ProductCategoryRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.ProductCategories)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
    return query;
  }

  static buildDeleteProductCategoriesQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.ProductCategories).update({ Deleted: true }).in('id', ids).select();
  }

  static buildToggleProductCategoriesQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('productcategories_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }
}
