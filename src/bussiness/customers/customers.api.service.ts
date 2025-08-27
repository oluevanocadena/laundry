import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { BusyProp } from '@type/busy.type';
import { FacadeApiBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import { Customer } from '@bussiness/customers/customers.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;
  private table = 'Customers';

  customers = new SubjectProp<Customer[]>([]);

  constructor(public sessionService: SessionService) {
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

  async getCustomers(search?: string, page: number = 1, pageSize: number = 50) {
    await this.executeWithBusy(async () => {
      let query = this.client
        .from(this.table)
        .select('*')
        .eq('OrganizationId', this.sessionService.organizationId)
        .eq('Deleted', false)
        .eq('Disabled', false);

      if (search) {
        query = query.ilike('FullName', `%${search}%`);
      }
      query = query.range((page - 1) * pageSize, page * pageSize);
      const { orderSaved, error } = await query;
      if (error) throw error;
      this.customers.value = orderSaved;
    }, 'fetching customers');
  }

  async saveCustomer(customer: Customer) {
    return this.executeWithBusy(async () => {
      const { orderSaved, error } = await this.client
        .from(this.table)
        .upsert(customer);
      if (error) throw error;
      return orderSaved;
    }, 'saving customer');
  }

  async deleteCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client
        .from(this.table)
        .update({ Deleted: true })
        .eq('id', id);
      if (error) throw error;
    }, 'deleting customer');
  }

  async disableCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client
        .from(this.table)
        .update({ Disabled: true })
        .eq('id', id);
      if (error) throw error;
    }, 'disabling customer');
  }

  async enableCustomer(id: string) {
    this.executeWithBusy(async () => {
      const { error } = await this.client
        .from(this.table)
        .update({ Disabled: false })
        .eq('id', id);
      if (error) throw error;
    }, 'enabling customer');
  }
}
