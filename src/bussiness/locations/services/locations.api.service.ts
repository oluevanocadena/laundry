import { Injectable } from '@angular/core';

import { LocationsQueryDomain } from '@bussiness/locations/domains/locations.query.domain';
import { Location, LocationRequest } from '@bussiness/locations/interfaces/locations.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedResults, SupabaseResponse } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService extends SupabaseBaseApiService {
  locations = new SubjectProp<Location[]>([]);
  pagedLocations = new SubjectProp<PagedResults<Location>>(null);

  constructor() {
    super();
  }

  protected override getCacheStore(): ICacheStore {
    //Define cache strategy LocalStorageCacheStore| MemoryCacheStore
    return new LocalStorageCacheStore();
  }

  getPagedLocations(request: LocationRequest, useCache = true) {
    const cacheKey = this.buildCacheKey(`pagedLocations:${this.sessionService.organizationId}`, request);

    return this.getWithCache(
      cacheKey,
      async () => {
        const query = LocationsQueryDomain.buildPagedQuery(request, this.client, this.sessionService);
        const countQuery = LocationsQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

        const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
        const { data, error } = queryResult;
        const totalCount = totalCountResult.count ?? 0;
        (data as unknown as Location[]).forEach((location) => {
          location.Checked = false;
        });
        this.pagedLocations.value = {
          data: (data as unknown as Location[]) ?? [],
          count: totalCount,
        };
        return super.handleResponse(data, error, undefined, totalCount);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto,
      (cachedData) => {
        this.pagedLocations.value = {
          data: cachedData,
          count: Array.isArray(cachedData) ? cachedData.length : 0,
        };
      },
    );
  }

  getLocations(disabled: boolean | null = null, useCache = true) {
    const cacheKey = this.buildCacheKey(`locations:${this.sessionService.organizationId}`, { disabled });

    return this.getWithCache(
      cacheKey,
      async () => {
        const query = LocationsQueryDomain.buildLocationsQuery(disabled, this.client, this.sessionService);
        const { data, error } = await query;
        this.locations.value = data;
        return super.handleResponse(data, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
      (cachedData) => {
        this.locations.value = cachedData;
      },
    );
  }

  getDefaultLocation(organizationId: string, useCache = true) {
    const cacheKey = this.buildCacheKey(`defaultLocation:${organizationId}`, {});
    return this.getWithCache(
      cacheKey,
      async () => {
        const query = LocationsQueryDomain.buildDefaultLocationQuery(organizationId, this.client);
        const { data, error } = await query;
        return super.handleResponse(data, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
    );
  }

  async saveLocation(location: Location): Promise<SupabaseResponse<Location> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).upsert(location).select().single();
      this.clearAllCaches();
      return super.handleResponse(data, error);
    }, 'Saving Location');
  }

  async disableLocation(id: string, disabled: boolean) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).update({ Disabled: !disabled }).eq('id', id);
      this.clearAllCaches();
      return super.handleResponse(data, error);
    }, 'Disabling Location');
  }

  async deleteLocation(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Locations).delete().eq('id', id);
      this.clearAllCaches();
      return super.handleResponse(data, error);
    }, 'Deleting Location');
  }

  deleteLocations(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildDeleteLocationsQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as Location[], error);
    });
  }

  disableLocations(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildToggleLocationsQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as Location[], error);
    });
  }
}
