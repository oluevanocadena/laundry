import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../../environments/environment';
import { HttpService } from '../../services/common/http.service';
import { BusyProp } from '../../types/busy.type';
import { FacadeApiBase } from '../../types/facade.base';
import { SubjectProp } from '../../types/subject.type';
import { Location } from './locations.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;
  private table = 'Locations';

  locations = new SubjectProp<Location[]>([]);

  constructor(private readonly httpService: HttpService) {
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
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getLocations(disabled: boolean = false) {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('Deleted', false)
        .eq('Disabled', disabled);
      if (error) throw error;
      this.locations.value = data;
    }, 'fetching locations');
  }
}
