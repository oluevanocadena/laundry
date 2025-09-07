import { Injectable } from '@angular/core';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { StorageProp } from '@globals/types/storage.type';
import { Organization } from '../organizations.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsApiService extends ApiBaseService {
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
