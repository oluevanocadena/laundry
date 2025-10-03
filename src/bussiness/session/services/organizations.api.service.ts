import { Injectable } from '@angular/core';

import { Organization } from '@bussiness/settings/interfaces/organizations.interface';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { StorageProp } from '@globals/types/storage.type';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsApiService extends SupabaseBaseApiService {
  public organization = new StorageProp<Organization | null>(
    null,
    'ORGANIZATION_COOKIE'
  );

  constructor() {
    super();
  }

  saveOrganization(organization: Organization) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Organizations)
        .upsert(organization)
        .select()
        .single();
      if (error) console.log('👉🏽 error', error);
      return super.handleResponse(data as unknown as Organization, error);
    });
  }

  deleteOrganization(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Organizations)
        .delete()
        .eq('id', id);
      return super.handleResponse(data as unknown as Organization, error);
    });
  }

  getOrganizations() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Organizations)
        .select('*');
      if (error) console.log('👉🏽 error', error);
      return super.handleResponse(data as unknown as Organization[], error);
    });
  }

  getOrganization(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Organizations)
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.log('👉🏽 error', error);
      return super.handleResponse(data as unknown as Organization, error);
    });
  }
}
