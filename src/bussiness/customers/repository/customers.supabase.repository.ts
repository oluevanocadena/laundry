import { Injectable } from '@angular/core';

import { CustomersQueryDomain } from '@bussiness/customers/domains/customer.query.domain';
import { Customer, CustomerRequest } from '@bussiness/customers/interfaces/customers.interfaces';
import { ICustomersRepository } from '@bussiness/customers/repository/customers.repository';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class CustomersSupabaseRepository extends SupabaseBaseApiService implements ICustomersRepository {
  //Results
  public customers = new SubjectProp<ResponseResult<Customer[]>>(null);
  public pagedCustomers = new SubjectProp<PagedResults<Customer>>(null);

  constructor() {
    super();
  }

  protected override getCacheStore(): ICacheStore {
    return new LocalStorageCacheStore();
  }

  getAll(): Promise<ResponseResult<Customer[]>> {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildGetAllQuery(this.client, this.sessionService);
      const { data, error } = await query;
      this.customers.value = super.buildReponse(data, error);
      return this.customers.value;
    }, 'Fetching Customers');
  }

  getById(id: string): Promise<ResponseResult<Customer> | null> {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildGetByIdQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Fetching Customer');
  }

  getPaged(request: CustomerRequest) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = CustomersQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      (data as unknown as Customer[]).forEach((customer) => {
        customer.Checked = false;
      });
      this.pagedCustomers.value = {
        data: (data as unknown as Customer[]) ?? [],
        count: totalCount,
      };
      return super.buildReponse(data, error);
    }, 'Fetching Customers');
  }

  async save(customer: Customer): Promise<ResponseResult<Customer>> {
    return this._saveOrUpdate(customer);
  }

  async update(customer: Customer): Promise<ResponseResult<Customer>> {
    return this._saveOrUpdate(customer);
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<Customer>> {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildDisableQuery(this.client, this.sessionService, id, state);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Disabling Customer');
  }

  async delete(id: string) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildDeleteQuery(this.client, this.sessionService, id);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Deleting Customer');
  }

  deleteMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildDeleteCustomersQuery(this.client, ids);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildToggleCustomersQuery(this.client, ids);
      const { data, error } = await query;
      return super.buildReponse(data as unknown as void, error);
    });
  }

  // Métodos adicionales del API service
  async getCustomers(search?: string, page: number = 1, pageSize: number = 50): Promise<ResponseResult<Customer[]>> {
    return this.executeWithBusy(async () => {
      let query = this.client
        .from(SupabaseTables.Customers)
        .select('*')
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Deleted', false)
        .eq('Disabled', false);

      if (search) {
        query = query.ilike('FullName', `%${search}%`);
      }
      query = query.range((page - 1) * pageSize, page * pageSize);
      const { data, error } = await query;
      this.customers.value = super.buildReponse(data, error);
      return this.customers.value;
    }, 'fetching customers');
  }

  async saveCustomer(customer: Customer): Promise<ResponseResult<Customer>> {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildSaveOrUpdateQuery(this.client, customer);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'saving customer');
  }

  async deleteCustomer(id: string): Promise<ResponseResult<Customer>> {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Deleted: true }).eq('id', id);
      return super.buildReponse({} as Customer, error, undefined, 1);
    }, 'deleting customer');
  }

  async disableCustomer(id: string): Promise<ResponseResult<Customer>> {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Disabled: true }).eq('id', id);
      return super.buildReponse({} as Customer, error, undefined, 1);
    }, 'disabling customer');
  }

  async enableCustomer(id: string): Promise<ResponseResult<Customer>> {
    return this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Disabled: false }).eq('id', id);
      return super.buildReponse({} as Customer, error, undefined, 1);
    }, 'enabling customer');
  }

  getPosCustomer(organizationId: string, useCache: boolean = true): Promise<ResponseResult<Customer>> {
    const cacheKey = this.buildCacheKey(`posCustomer:${organizationId}`, {});
    return this.getWithCache(
      cacheKey,
      async () => {
        const query = CustomersQueryDomain.buildGetPosCustomerQuery(this.client, organizationId);
        const { data, error } = await query;
        return super.buildReponse(data as Customer, error);
      },
      useCache ? 3_600_000 : 0, // TTL de 1 hora (3,600,000 ms)
    );
  }

  private _saveOrUpdate(customer: Customer) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildSaveOrUpdateQuery(this.client, customer);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    });
  }
}
