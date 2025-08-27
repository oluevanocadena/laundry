import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { supabase } from '@environments/environment';
import { BusyProp } from '@type/busy.type';
import { FacadeApiBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import { Order, OrderItem } from '@bussiness/orders/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  private table = 'Orders';
  private tableItems = 'OrderItems';

  orders = new SubjectProp<Order[]>([]);

  constructor(public nzMessageService: NzMessageService) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    console.log(`🚀 [Orders API] ${message || 'Executing operation'}`);
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

  updateOrder(order: Order, orderItems: OrderItem[]) {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await this.client
        .from(this.table)
        .upsert(order)
        .select()
        .single();
      if (error) throw error;

      if (orderSaved.id) {
        orderItems.forEach(async (item) => {
          item.OrderId = orderSaved.id;
          const { data: itemSaved, error } = await this.client
            .from(this.tableItems)
            .upsert(item)
            .select()
            .single();
          if (error) throw error;
          return itemSaved;
        });
      } else {
        throw new Error(
          'Ocurrió un error al guardar el pedido, intente nuevamente.'
        );
      }
      return orderSaved;
    }, 'Updating Order');
  }
}
