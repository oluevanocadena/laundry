import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { BusyProp } from '@type/busy.type';
import { FacadeApiBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import { Location } from '@bussiness/locations/locations.interfaces';
import { Session } from '@bussiness/session/session.interface';
import { CookiesService } from '@services/common/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;
  private table = 'Locations';

  locations = new SubjectProp<Location[]>([]);

  constructor(
    public nzMessageService: NzMessageService,
    public cookiesService: CookiesService<Session>
  ) {
    this.client = createClient(supabase.url, supabase.key);
  }

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
    this.executeWithBusy(async () => {
      const { data, error } =
        disabled === null
          ? await this.client.from(this.table).select('*').eq('Deleted', false)
          : await this.client
              .from(this.table)
              .select('*')
              .eq(
                'OrganizationId',
                this.cookiesService.UserInfo.Organization.id
              )
              .eq('Deleted', false)
              .eq('Disabled', disabled);
      this.locations.value = data || [];
    }, 'Fetching locations');
  }

  async saveLocation(location: Location) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(location);
      if (error) {
        this.nzMessageService.error(
          '¡Ocurrió un error al guardar los cambios! ⛔'
        );
        return false;
      }
      this.getLocations();
      return true;
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
      this.getLocations();
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
      this.getLocations();
      return data;
    }, 'Deleting Location');
  }
}
