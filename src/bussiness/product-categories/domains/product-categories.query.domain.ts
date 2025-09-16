import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProductCategoryRequest } from '../interfaces/product-categories.interfaces';

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
      query = query.or(
        [`Name.ilike.%${searchTerm}%`].join(','),
      );
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
}
