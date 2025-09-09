import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Location } from '@bussiness/locations/locations.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseResponse } from '@globals/interfaces/supabase.interface';
import { supabaseClient } from '@globals/singleton/supabase.client';
import { BusyProp } from '@globals/types/busy.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client = supabaseClient;
  private table = 'Locations';

  locations = new SubjectProp<Location[]>([]);

  constructor(
    public nzMessageService: NzMessageService,
    public sessionService: SessionService
  ) {}

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Locations API] ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al guardar los cambios! ⛔'
      );
      console.error('⛔ [Locations API] Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getLocations(disabled: boolean | null = null) {
    return this.executeWithBusy(async () => {
      const { data, error } =
        disabled === null
          ? await this.client.from(this.table).select('*').eq('Deleted', false)
          : await this.client
              .from(this.table)
              .select('*')
              .eq('OrganizationId', this.sessionService.organizationId)
              .eq('Deleted', false)
              .eq('Disabled', disabled);
      return (this.locations.value = data || []);
    }, 'Fetching locations');
  }

  getDefaultLocation(organizationId: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('OrganizationId', organizationId)
        .eq('Default', true)
        .eq('Deleted', false)
        .single();
      return data;
    }, 'Fetching default location');
  }

  async saveLocation(
    location: Location
  ): Promise<SupabaseResponse<Location> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(location)
        .select()
        .single();
      if (error) {
        return { success: false, error: error };
      }
      return { response: data, success: true };
    }, 'Saving Location');
  }

  async disableLocation(id: string, disabled: boolean) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .update({ Disabled: !disabled })
        .eq('id', id);
      if (error) {
        this.nzMessageService.error(
          '¡Ocurrió un error al guardar los cambios! ⛔'
        );
        return false;
      }
      return data;
    }, 'Disabling Location');
  }

  async deleteLocation(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .delete()
        .eq('id', id);
      if (error) {
        this.nzMessageService.error(
          '¡Ocurrió un error al eliminar la sucursal! ⛔'
        );
        return false;
      }
      return data;
    }, 'Deleting Location');
  }
}
