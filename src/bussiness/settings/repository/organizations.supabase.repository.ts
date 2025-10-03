import { Injectable } from '@angular/core';

import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import { Organization } from '@bussiness/settings/interfaces/organizations.interface';
import { IOrganizationsRepository } from '@bussiness/settings/repository/organizations.repository';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsSupabaseRepository extends SupabaseBaseApiService implements IOrganizationsRepository {
  //Results
  public organization = new SubjectProp<ResponseResult<Organization>>(null);

  constructor() {
    super();
  }

  getById(id: string): Promise<ResponseResult<UnitMeasure> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.UnitMeasures)
        .select('*')
        .eq('Deleted', false)
        .eq('Id', id)
        .single();
      return super.handleResponse(data, error);
    }, 'Fetching Unit Measure');
  }

  save(entity: Organization): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Organizations).insert(entity).select().single();
      return super.handleResponse(data as unknown as Organization, error);
    }, 'Saving Organization');
  }

  update(entity: Organization): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Organizations)
        .update(entity)
        .eq('id', entity.id)
        .select()
        .single();
      return super.handleResponse(data as unknown as Organization, error);
    }, 'Updating Organization');
  }
}
