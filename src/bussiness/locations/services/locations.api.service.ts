import { Injectable } from '@angular/core';

import { Location, LocationRequest } from '@bussiness/locations/interfaces/locations.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults, SupabaseResponse } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { LocationsQueryDomain } from '../domains/locations.query.domain';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService extends ApiBaseService {
  locations = new SubjectProp<Location[]>([]);
  pagedLocations = new SubjectProp<PagedResults<Location>>(null);

  constructor(public sessionService: SessionService) {
    super();
  }

  getPagedLocations(request: LocationRequest) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = LocationsQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      this.pagedLocations.value = {
        data: (data as unknown as Location[]) ?? [],
        count: totalCount,
      };
      return super.handleResponse(data, error);
    }, 'Fetching locations');
  }

  getLocations(disabled: boolean | null = null) {
    return this.executeWithBusy(async () => {
      const { data, error } =
        disabled === null
          ? await this.client.from(SupabaseTables.Locations).select('*').eq('Deleted', false)
          : await this.client
              .from(SupabaseTables.Locations)
              .select('*')
              .eq('OrganizationId', this.sessionService.organizationId)
              .eq('Deleted', false)
              .eq('Disabled', disabled);
      this.locations.value = data;
      return super.handleResponse(data, error);
    }, 'Fetching locations');
  }

  getDefaultLocation(organizationId: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Locations)
        .select('*')
        .eq('OrganizationId', organizationId)
        .eq('Default', true)
        .eq('Deleted', false)
        .single();
      return super.handleResponse(data, error);
    }, 'Fetching default location');
  }

  async saveLocation(location: Location): Promise<SupabaseResponse<Location> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).upsert(location).select().single();
      return super.handleResponse(data, error);
    }, 'Saving Location');
  }

  async disableLocation(id: string, disabled: boolean) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).update({ Disabled: !disabled }).eq('id', id);
      return super.handleResponse(data, error);
    }, 'Disabling Location');
  }

  async deleteLocation(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).delete().eq('id', id);
      return super.handleResponse(data, error);
    }, 'Deleting Location');
  }
}
