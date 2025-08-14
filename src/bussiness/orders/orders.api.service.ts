import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { supabase } from '../../environments/environment';
import { BusyProp } from '../../types/busy.type';
import { FacadeApiBase } from '../../types/facade.base';
import { SubjectProp } from '../../types/subject.type';
import { Order } from './orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  private table = 'Orders';

  orders = new SubjectProp<Order[]>([]);

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Products API] ${message || 'Executing operation'}`);
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al realizar la acción! ⛔'
      );
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getOrders() {
    this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(this.table).select('*');
      if (error) throw error;
      this.orders.value = data || [];
    }, 'Fetching Orders');
  }
}
