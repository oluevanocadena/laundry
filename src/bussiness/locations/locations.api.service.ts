import { Injectable } from '@angular/core';

import { Location } from '@bussiness/locations/locations.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseResponse } from '@globals/interfaces/supabase.interface';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService extends ApiBaseService {
  locations = new SubjectProp<Location[]>([]);

  constructor(public sessionService: SessionService) {
    super();
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
      const { data, error } = await this.client
        .from(SupabaseTables.Locations)
        .update({ Disabled: !disabled })
        .eq('id', id);
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
