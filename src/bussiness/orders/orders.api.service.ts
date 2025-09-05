import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { supabase } from '@environments/environment';
import { BusyProp } from '../../globals/types/busy.type';
import { FacadeApiBase } from '../../globals/types/facade.base';
import { SubjectProp } from '../../globals/types/subject.type';

import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { SupabaseTables } from '../../globals/constants/supabase-tables.constants';
import { OrderItemStatusEnum, OrderStatusEnum } from './orders.enums';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

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
      const { data, error } = await this.client
        .from(SupabaseTables.Orders)
        .select(
          `*, 
          OrderItems: ${SupabaseTables.OrderItems}(*, 
            Product: ${SupabaseTables.Products}(*),  
            ItemStatus: ${SupabaseTables.OrderItemStatuses}(*)
          ),
          Customer:${SupabaseTables.Customers}(*),
          Location:${SupabaseTables.Locations}(*),
          Organization:${SupabaseTables.Organizations}(*),
          OrderStatus: ${SupabaseTables.OrderStatuses}(*)`
        )
        .order('OrderNumber', { ascending: false });
      if (error) throw error;

      this.orders.value = (data as unknown as Order[]) || [];
    }, 'Fetching Orders');
  }

  getOrder(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Orders)
        .select(
          `*, 
          OrderItems: ${SupabaseTables.OrderItems}(*, 
            Product: ${SupabaseTables.Products}(*),  
            ItemStatus: ${SupabaseTables.OrderItemStatuses}(*)
          ),
          Customer:${SupabaseTables.Customers}(*),
          Location:${SupabaseTables.Locations}(*),
          Organization:${SupabaseTables.Organizations}(*),
          OrderStatus: ${SupabaseTables.OrderStatuses}(*)`
        )
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as unknown as Order;
    }, 'Fetching Order');
  }

  updateOrder(order: Order, orderItems: OrderItem[]) {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await this.client
        .from(SupabaseTables.Orders)
        .upsert(order)
        .select()
        .single();
      if (error) throw error;

      if (orderSaved.id) {
        orderItems.forEach(async (item) => {
          item.OrderId = orderSaved.id;
          const { data: itemSaved, error } = await this.client
            .from(SupabaseTables.OrderItems)
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
      return this.getOrder(orderSaved.id);
    }, 'Updating Order');
  }

  updateOrderStatus(id: string, status: OrderStatusEnum) {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await this.client
        .from(SupabaseTables.Orders)
        .update({ StatusId: status })
        .eq('id', id)
        .select()
        .single();
      if (error)
        throw new Error(
          'Ocurrió un error al actualizar el estado del pedido, intente nuevamente.'
        );
      return orderSaved;
    }, 'Updating Order Status');
  }

  updateOrderItem(orderItem: OrderItem) {
    return this.executeWithBusy(async () => {
      const { data: orderItemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .upsert(orderItem)
        .select()
        .single();
      if (error) throw error;
      return orderItemSaved;
    }, 'Updating Order Item');
  }

  updateOrderItemStatus(id: string, status: OrderItemStatusEnum) {
    return this.executeWithBusy(async () => {
      const { data: orderItemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .update({ ItemStatusId: status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return orderItemSaved;
    }, 'Updating Order Item Status');
  }

  updateOrderItemStatusAll(orderId: string, status: OrderItemStatusEnum) {
    return this.executeWithBusy(async () => {
      const { data: orderItemsSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .update({ ItemStatusId: status })
        .eq('OrderId', orderId)
        .select();
      if (error) throw error;
      if (orderItemsSaved.length > 0) {
        const isCompletedOrder = orderItemsSaved.every(
          (item) =>
            item.ItemStatusId === OrderItemStatusEnum.Completed ||
            item.ItemStatusId === OrderItemStatusEnum.Cancelled
        );
        if (isCompletedOrder) {
          this.updateOrderStatus(orderId, OrderStatusEnum.Completed);
        }
      }
      return orderItemsSaved;
    }, 'Updating Order Item Status All');
  }
}
