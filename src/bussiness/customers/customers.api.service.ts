import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../../environments/environment';
import { HttpService } from '../../services/common/http.service';
import { CustomerCreationStatusEnum } from '../../services/customers-status.service';
import { BusyProp } from '../../types/busy.type';
import { SubjectProp } from '../../types/subject.type';
import { Customer } from './customers.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CustomersApiService {
  public busy = new BusyProp(false);
  private client: SupabaseClient;
  private table = 'Customers';

  customers = new SubjectProp<Customer[]>([]);

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

  async getCustomers() {
    await this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('Deleted', false);
      if (error) throw error;
      this.customers.value = data;
    }, 'fetching customers');
  }

  async saveCustomer(customer: Customer) {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(customer);
      if (error) throw error;
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
