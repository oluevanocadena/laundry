import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { BusyProp } from '../../../globals/types/busy.type';
import { FacadeApiBase } from '../../../globals/types/facade.base';
import { StorageProp } from '../../../globals/types/storage.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Organization } from '../organizations.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  public table = 'Organizations';

  public organization = new StorageProp<Organization | null>(
    null,
    'ORGANIZATION_COOKIE'
  );

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Session API] ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error('Ocurrió un error al realizar la acción');
      console.error('⛔ Error:', error);
      return error as any;
    } finally {
      this.busy.value = false;
    }
  }

  saveOrganization(organization: Organization) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(organization)
        .select()
        .single();
      if (error) throw error;
      return data;
    });
  }

  getOrganizations() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(this.table).select('*');
      if (error) throw error;
      return data;
    });
  }

  getOrganization(id: string) {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('id', id);
      if (error) throw error;
      return data;
    });
  }
}
