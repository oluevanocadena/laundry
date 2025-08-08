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

  async getCustomers() {
    console.log('🚩 fetching customers');
    this.busy.value = true;
    try {
      const { data, error } = await this.client.from(this.table).select('*');
      if (error) throw error;
      this.customers.value = data;
      console.log('🚩 customers fetched', this.customers.value);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      this.busy.value = false;
      console.log('Finalizado');
    }
  }

  async getCustomerDraft() {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('StatusCreationId', CustomerCreationStatusEnum.Draft);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting customer draft:', error);
      throw error;
    }
  }

  async saveCustomer(customer: Customer) {
    this.busy.value = true;
    try {
      const { data, error } = await this.client
        .from(this.table)
        .upsert(customer);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving customer:', error);
      throw error;
    } finally {
      this.busy.value = false;
    }
  }
}
