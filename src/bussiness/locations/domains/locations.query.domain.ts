import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { LocationRequest } from '../interfaces/locations.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class LocationsQueryDomain {
  static buildPagedQuery(request: LocationRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Locations)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (request.disabled !== null && request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or(
        [`Name.ilike.%${searchTerm}%`, `Phone.ilike.%${searchTerm}%`, `Address.ilike.%${searchTerm}%`].join(','),
      );
    }
    return query;
  }

  static buildTotalCountQuery(request: LocationRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Locations)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
    return query;
  }

  static buildLocationsQuery(disabled: boolean | null, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Locations)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);

    if (disabled !== null) {
      query = query.eq('Disabled', disabled);
    }

    return query;
  }

  static buildDefaultLocationQuery(organizationId: string, client: SupabaseClient) {
    return client
      .from(SupabaseTables.Locations)
      .select('*')
      .eq('OrganizationId', organizationId)
      .eq('Default', true)
      .eq('Deleted', false)
      .single();
  }

  static buildDeleteLocationsQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Locations).delete().in('id', ids).select();
  }

  static buildToggleLocationsQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('location_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }
}
