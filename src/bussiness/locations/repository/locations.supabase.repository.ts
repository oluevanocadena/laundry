import { Injectable } from '@angular/core';

import { LocationsQueryDomain } from '@bussiness/locations/domains/locations.query.domain';
import { Location, LocationRequest } from '@bussiness/locations/interfaces/locations.interfaces';
import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class LocationsSupabaseRepository extends SupabaseBaseApiService implements ILocationsRepository {
  //Results
  public locations = new SubjectProp<Location[]>([]);
  public pagedLocations = new SubjectProp<PagedResults<Location>>(null);

  constructor() {
    super();
  }

  protected override getCacheStore(): ICacheStore {
    //Define cache strategy LocalStorageCacheStore| MemoryCacheStore
    return new LocalStorageCacheStore();
  }

  getAll(): Promise<ResponseResult<Location[]>> {
    return this.getLocations(null, true);
  }

  getById(id: string): Promise<ResponseResult<Location> | null> {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildGetByIdQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Fetching Location');
  }

  getPaged(request: LocationRequest) {
    const cacheKey = this.buildCacheKey(`pagedLocations:${this.sessionService.organizationId}`, request);
    const useCache = true;
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
        return super.buildReponse(data, error, undefined, totalCount);
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

  async save(location: Location): Promise<ResponseResult<Location>> {
    return this._saveOrUpdate(location);
  }

  async update(location: Location): Promise<ResponseResult<Location>> {
    return this._saveOrUpdate(location);
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<Location>> {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildDisableQuery(this.client, this.sessionService, id, state);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.buildReponse(data, error);
    }, 'Disabling Location');
  }

  async delete(id: string) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildDeleteQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.buildReponse(data, error);
    }, 'Deleting Location');
  }

  deleteMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildDeleteLocationsQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.buildReponse(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildToggleLocationsQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.buildReponse(data as unknown as void, error);
    });
  }

  // Métodos específicos de locations (migrados del API service)
  // Métodos internos con cache (usados por getAll y getPaged)
  private getLocations(disabled: boolean | null = null, useCache = true): Promise<ResponseResult<Location[]>> {
    const cacheKey = this.buildCacheKey(`locations:${this.sessionService.organizationId}`, { disabled });

    return this.getWithCache(
      cacheKey,
      async () => {
        const query = LocationsQueryDomain.buildLocationsQuery(disabled, this.client, this.sessionService);
        const { data, error } = await query;
        this.locations.value = data;
        return super.buildReponse(data, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
      (cachedData) => {
        this.locations.value = cachedData;
      },
    );
  }

  getDefaultLocation(organizationId: string, useCache = true): Promise<ResponseResult<Location>> {
    const cacheKey = this.buildCacheKey(`defaultLocation:${organizationId}`, {});
    return this.getWithCache(
      cacheKey,
      async () => {
        const query = LocationsQueryDomain.buildDefaultLocationQuery(organizationId, this.client);
        const { data, error } = await query;
        return super.buildReponse(data, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
    );
  }

  private _saveOrUpdate(location: Location) {
    return this.executeWithBusy(async () => {
      const query = LocationsQueryDomain.buildSaveOrUpdateQuery(this.client, location);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.buildReponse(data, error);
    });
  }
}
