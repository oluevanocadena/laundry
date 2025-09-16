import { ProductRequest } from '@bussiness/products/interfaces/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';

export class ProductsQueryDomain {
  static buildQuery(request: ProductRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Products)
      .select(
        `*, ProductLocations: ${SupabaseTables.ProductLocations}(*, Location: ${SupabaseTables.Locations}(*)),  
            UnitMeasure: ${SupabaseTables.UnitMeasures}(*) `,
      )
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or(
        [
          `Name.ilike.%${searchTerm}%`,
          `Description.ilike.%${searchTerm}%`,
          `Barcode.ilike.%${searchTerm}%`,
          `SKU.ilike.%${searchTerm}%`,
        ].join(','),
      );
    }

    if (request.sortBy) {
      query = query.order(request.sortBy, { ascending: request.sortOrder === 'asc' });
    }

    return query;
  }

  static buildTotalCountQuery(request: ProductRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Products)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
    return query;
  }
}
