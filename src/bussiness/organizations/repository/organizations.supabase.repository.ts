import { Injectable } from '@angular/core';

import { OrganizationsQueryDomain } from '@bussiness/organizations/domains/organizations.query.domain';
import { Organization } from '@bussiness/organizations/interfaces/organizations.interface';
import { OrganizationRequest } from '@bussiness/organizations/interfaces/organizations.request.interface';
import { IOrganizationsRepository } from '@bussiness/organizations/repository/organizations.repository';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsSupabaseRepository extends SupabaseBaseApiService implements IOrganizationsRepository {
  public organization = new SubjectProp<ResponseResult<Organization>>(null);
  public organizations = new SubjectProp<ResponseResult<Organization[]>>(null);
  public pagedOrganizations = new SubjectProp<PagedResults<Organization>>(null);

  public currentOrganization = new StorageProp<Organization | null>(null, 'ORGANIZATION_COOKIE');

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<Organization[]>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildGetAllQuery(this.client);
      const { data, error } = await query;
      this.organizations.value = super.buildReponse(data as Organization[], error);
      return this.organizations.value;
    }, 'Fetching Organizations');
  }

  getById(id: string): Promise<ResponseResult<Organization> | null> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildGetByIdQuery(this.client, id);
      const { data, error } = await query;
      this.organization.value = super.buildReponse(data as Organization, error);
      return this.organization.value;
    }, 'Fetching Organization');
  }

  save(organization: Organization): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildInsertQuery(this.client, organization);
      const { data, error } = await query;
      if (!error && data) {
        this.organization.value = super.buildReponse(data as Organization, error);
      }
      return super.buildReponse(data as Organization, error);
    }, 'Saving Organization');
  }

  update(organization: Organization): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildUpdateQuery(this.client, organization);
      const { data, error } = await query;
      if (!error && data) {
        this.organization.value = super.buildReponse(data as Organization, error);
      }
      return super.buildReponse(data as Organization, error);
    }, 'Updating Organization');
  }

  async delete(id: string): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildDeleteQuery(this.client, id);
      const { data, error } = await query;
      return super.buildReponse(data as Organization, error);
    }, 'Deleting Organization');
  }

  async hardDelete(id: string): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildHardDeleteQuery(this.client, id);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    }, 'Deleting Organization permanently');
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(
      async () => {
        const query = OrganizationsQueryDomain.buildDisableQuery(this.client, id, state);
        const { data, error } = await query;
        return super.buildReponse(data as Organization, error);
      },
      state ? 'Disabling Organization' : 'Enabling Organization',
    );
  }

  getPaged(request: OrganizationRequest): Promise<ResponseResult<Organization[]>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildPagedQuery(request, this.client);
      const countQuery = OrganizationsQueryDomain.buildTotalCountQuery(request, this.client);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;

      const organizations = (data as unknown as Organization[]) || [];
      organizations.forEach((organization) => {
        organization.Checked = false;
      });

      this.pagedOrganizations.value = {
        data: (data as unknown as Organization[]) ?? [],
        count: totalCount,
      };

      return super.buildReponse(data, error, undefined, totalCount);
    }, 'Fetching Organizations');
  }

  deleteMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildDeleteManyQuery(this.client, ids);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    }, 'Deleting Organizations');
  }

  toggleEnableMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildToggleEnableManyQuery(this.client, ids);
      const { data: organizations, error: fetchError } = await query;

      if (fetchError || !organizations) {
        return super.buildReponse(undefined as unknown as void, fetchError);
      }

      const updates = (organizations as unknown as Organization[]).map((org) => ({
        id: org.id!,
        disabled: !org.Disabled,
      }));

      const updateQuery = OrganizationsQueryDomain.buildUpdateDisabledStatesQuery(this.client, updates);
      const { data, error } = await updateQuery;

      return super.buildReponse(data as unknown as void, error);
    }, 'Toggling Organizations');
  }

  async saveOrUpdate(organization: Organization): Promise<ResponseResult<Organization>> {
    return this.executeWithBusy(async () => {
      const query = OrganizationsQueryDomain.buildUpsertQuery(this.client, organization);
      const { data, error } = await query;
      if (!error && data) {
        this.organization.value = super.buildReponse(data as Organization, error);
      }
      return super.buildReponse(data as Organization, error);
    }, 'Saving Organization');
  }
}
