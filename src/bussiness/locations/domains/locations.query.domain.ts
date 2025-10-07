import { LocationRequest } from '@bussiness/locations/interfaces/locations.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';

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

  // Métodos adicionales para el repository
  static buildGetAllQuery(client: SupabaseClient, sessionService: SessionService) {
    return client
      .from(SupabaseTables.Locations)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false)
      .eq('Disabled', false);
  }

  static buildGetByIdQuery(client: SupabaseClient, sessionService: SessionService, id: string) {
    return client
      .from(SupabaseTables.Locations)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('id', id)
      .eq('Deleted', false)
      .single();
  }

  static buildSaveOrUpdateQuery(client: SupabaseClient, location: any) {
    return client.from(SupabaseTables.Locations).upsert(location).select('*').single();
  }

  static buildDisableQuery(client: SupabaseClient, sessionService: SessionService, id: string, state: boolean) {
    return client
      .from(SupabaseTables.Locations)
      .update({ Disabled: state })
      .eq('id', id)
      .eq('OrganizationId', sessionService.organizationId)
      .select('*')
      .single();
  }

  static buildDeleteQuery(client: SupabaseClient, sessionService: SessionService, id: string) {
    return client
      .from(SupabaseTables.Locations)
      .delete()
      .eq('id', id)
      .eq('OrganizationId', sessionService.organizationId)
      .select('*')
      .single();
  }
}
