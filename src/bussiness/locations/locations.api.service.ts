import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../../environments/environment';
import { HttpService } from '../../services/common/http.service';
import { BusyProp } from '../../types/busy.type';
import { FacadeApiBase } from '../../types/facade.base';
import { SubjectProp } from '../../types/subject.type';
import { Location } from './locations.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookiesService } from '../../services/common/cookie.service';
import { Session } from '../session/session.interface';

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
    console.log(`🚩 ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al guardar los cambios! ⛔'
      );
      console.error('⛔ Error:', error);
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
      console.log('🚩 data', data);
      this.locations.value =
        data?.map((location: Location) => ({
          ...location,
          Checked: false,
        })) || [];
    }, 'fetching locations');
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
    }, 'saving location');
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
    }, 'disabling location');
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
    }, 'deleting location');
  }
}
