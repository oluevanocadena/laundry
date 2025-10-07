import { Injectable } from '@angular/core';

import { Customer, CustomerPagedResults, CustomerRequest } from '@bussiness/customers/interfaces/customers.interfaces';
import { CustomersQueryDomain } from '@bussiness/customers/domains/customer.query.domain';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class CustomersApiService extends SupabaseBaseApiService {
  customers = new SubjectProp<Customer[]>([]);
  pagedCustomers = new SubjectProp<CustomerPagedResults>(null);

  constructor() {
    super();
  }

  async getCustomers(search?: string, page: number = 1, pageSize: number = 50) {
    await this.executeWithBusy(async () => {
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
      this.customers.value = data;
      return super.handleResponse(this.customers.value, error, undefined, data?.length ?? 0);
    }, 'fetching customers');
  }

  async getPagedCustomers(request: CustomerRequest) {
    return this.executeWithBusy(async () => {
      // Inicializar query base
      const query = CustomersQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = CustomersQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      // Ejecutar consulta
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
      return super.handleResponse(this.pagedCustomers.value.data, error, undefined, totalCount);
    }, 'Fetching Customers');
  }

  async saveCustomer(customer: Customer) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Customers).upsert(customer);
      return super.handleResponse(data, error, undefined, 1);
    }, 'saving customer');
  }

  async deleteCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Deleted: true }).eq('id', id);
      return super.handleResponse(null, error, undefined, 1);
    }, 'deleting customer');
  }

  async disableCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Disabled: true }).eq('id', id);
      return super.handleResponse(null, error, undefined, 1);
    }, 'disabling customer');
  }

  async enableCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client.from(SupabaseTables.Customers).update({ Disabled: false }).eq('id', id);
      return super.handleResponse(null, error, undefined, 1);
    }, 'enabling customer');
  }

  deleteCustomers(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildDeleteCustomersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as Customer[], error);
    });
  }

  disableCustomers(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = CustomersQueryDomain.buildToggleCustomersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse(data as unknown as Customer[], error);
    });
  }
}
