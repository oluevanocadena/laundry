import { Injectable } from '@angular/core';

import { Role } from '@bussiness/roles/interfaces/roles.interfaces';
import { RolesQueryDomain } from '@bussiness/roles/domains/roles.query.domain';
import { IRolesRepository } from '@bussiness/roles/repository/roles.repository';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class RolesSupabaseRepository extends SupabaseBaseApiService implements IRolesRepository {
  public roles = new SubjectProp<ResponseResult<Role[]>>(null);

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<Role[]>> {
    return this.executeWithBusy(async () => {
      const query = RolesQueryDomain.buildGetAllQuery(this.client);
      const { data, error } = await query;
      this.roles.value = super.buildReponse(data as unknown as Role[], error);
      return this.roles.value;
    }, 'Fetching Roles');
  }

  getById(id: string): Promise<ResponseResult<Role> | null> {
    return this.executeWithBusy(async () => {
      const query = RolesQueryDomain.buildGetByIdQuery(this.client, Number(id));
      const { data, error } = await query;
      return super.buildReponse(data as unknown as Role, error);
    }, 'Fetching Role');
  }
}

