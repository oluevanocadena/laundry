import { Injectable } from '@angular/core';

import { OrderItemStatusEnum, OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order, OrderPagedResults, OrderRequest } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { OrdersQueryDomain } from '../domains/orders.query.domain';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService extends ApiBaseService {
  //Results
  pagedOrders = new SubjectProp<OrderPagedResults>(null);

  constructor(public sessionService: SessionService) {
    super();
  }

  getPagedOrders(request: OrderRequest) {
    return this.executeWithBusy(async () => {
      // Inicializar query base
      const query = OrdersQueryDomain.buildQuery(request, this.client);
      const countQuery = OrdersQueryDomain.buildTotalCountQuery(request, this.client);

      // Ejecutar consulta
      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;
      this.pagedOrders.value = {
        data: (data as unknown as Order[]) ?? [],
        count: totalCount,
      };
      return super.handleResponse(this.pagedOrders.value.data, error, undefined, totalCount);
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
            ItemStatus: ${SupabaseTables.OrderItemStatuses}(*),
            UnitMeasure: ${SupabaseTables.UnitMeasures}(*)
          ),
          Customer:${SupabaseTables.Customers}(*),
          Location:${SupabaseTables.Locations}(*),
          Organization:${SupabaseTables.Organizations}(*),
          OrderStatus: ${SupabaseTables.OrderStatuses}(*)`,
        )
        .eq('id', id)
        .single();
      return super.handleResponse<Order>(data as unknown as Order, error);
    }, 'Fetching Order');
  }

  updateOrder(order: Order, orderItems: OrderItem[]) {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await this.client.from(SupabaseTables.Orders).upsert(order).select().single();
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
        throw new Error('Ocurrió un error al guardar el pedido, intente nuevamente.');
      }
      return super.handleResponse<Order>(orderSaved, error);
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
      if (error) throw new Error('Ocurrió un error al actualizar el estado del pedido, intente nuevamente.');
      return super.handleResponse(orderSaved, error);
    }, 'Updating Order Status');
  }

  updateOrderItem(orderItem: OrderItem) {
    return this.executeWithBusy(async () => {
      const { data: orderItemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .upsert(orderItem)
        .select()
        .single();
      return super.handleResponse(orderItemSaved, error);
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
      return super.handleResponse<OrderItem>(orderItemSaved, error);
    }, 'Updating Order Item Status');
  }

  updateAllOrderItemsStatus(orderId: string, status: OrderItemStatusEnum) {
    const errorMessage = 'Ocurrió un error al actualizar el estado del pedido, intente nuevamente.';
    return this.executeWithBusy(async () => {
      const { data: itemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .update({ ItemStatusId: status })
        .eq('OrderId', orderId)
        .select();
      if (!error) {
        //TODO: Change for a trigger in the database
        const isCompletedOrder = itemSaved.every(
          (item) =>
            item.ItemStatusId === OrderItemStatusEnum.Completed || item.ItemStatusId === OrderItemStatusEnum.Cancelled,
        );
        if (isCompletedOrder) {
          this.updateOrderStatus(orderId, OrderStatusEnum.Completed);
        }
      } else {
        throw new Error(errorMessage);
      }
      const rspOrder = await this.getOrder(orderId);
      if (rspOrder.success) {
        return super.handleResponse<Order>(rspOrder.data as unknown as Order, error);
      } else {
        throw new Error(errorMessage);
      }
    }, 'Updating Order Item Status All');
  }
}
