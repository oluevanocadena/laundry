import { Injectable } from '@angular/core';

import { OrderItemStatusEnum, OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';

import { OrdersQueryDomain } from '@bussiness/orders/domains/orders.query.domain';
import { IOrdersRepository, OrderRequest } from '@bussiness/orders/repository/orders.repository';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class OrdersSupabaseRepository extends SupabaseBaseApiService implements IOrdersRepository {
  //Results
  pagedOrders = new SubjectProp<ResponseResult<Order[]>>(null);

  constructor() {
    super();
  }

  getPaged(request: OrderRequest): Promise<ResponseResult<Order[]>> {
    return this.executeWithBusy(async () => {
      // Construir query base y count query usando tu domain actual
      const query = OrdersQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = OrdersQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;

      this.pagedOrders.value = super.handleResponse<Order[]>(data as unknown as Order[], error, undefined, totalCount);
      return this.pagedOrders.value;
    }, 'Fetching Orders');
  }

  save(order: Order, orderItems: OrderItem[]): Promise<ResponseResult<Order>> {
    return this._saveOrUpdateOrder(order, orderItems);
  }

  update(order: Order, orderItems: OrderItem[]): Promise<ResponseResult<Order>> {
    return this._saveOrUpdateOrder(order, orderItems);
  }

  delete(id: string): Promise<ResponseResult<Order>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await OrdersQueryDomain.buildDeleteOrderQuery(this.client, id);
      return super.handleResponse<Order>(data as unknown as Order, error);
    });
  }

  disable(id: string, state: boolean): Promise<ResponseResult<Order>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await OrdersQueryDomain.buildUpdateOrderStatusQuery(this.client, id, state);
      return super.handleResponse<Order>(data as unknown as Order, error);
    });
  }

  getById(id: string): Promise<ResponseResult<Order> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await OrdersQueryDomain.buildGetSingleOrderQuery(this.client, id);
      return super.handleResponse<Order>(data as unknown as Order, error);
    }, 'Fetching Order');
  }

  deleteMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrdersQueryDomain.buildDeleteOrdersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrdersQueryDomain.buildToggleOrdersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  updateOrderStatus(id: string, status: OrderStatusEnum): Promise<ResponseResult<Order>> {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await this.client
        .from(SupabaseTables.Orders)
        .update({ StatusId: status })
        .eq('id', id)
        .select()
        .single();
      return super.handleResponse<Order>(orderSaved, error);
    }, 'Updating Order Status');
  }

  updateOrderItem(orderItem: OrderItem): Promise<ResponseResult<OrderItem>> {
    return this.executeWithBusy(async () => {
      const { data: orderItemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .upsert(orderItem)
        .select()
        .single();
      return super.handleResponse<OrderItem>(orderItemSaved, error);
    }, 'Updating Order Item');
  }

  updateOrderItemStatus(id: string, status: OrderItemStatusEnum): Promise<ResponseResult<Order>> {
    return this.executeWithBusy(async () => {
      const { data: orderItemSaved, error } = await this.client
        .from(SupabaseTables.OrderItems)
        .update({ ItemStatusId: status })
        .eq('id', id)
        .single<OrderItem>();
      const result = await this.getById(orderItemSaved?.OrderId ?? '');
      return super.handleResponse<Order>(result?.data as unknown as Order, error || result?.error);
    }, 'Updating Order Item Status');
  }

  updateAllOrderItemsStatus(orderId: string, status: OrderItemStatusEnum): Promise<ResponseResult<Order>> {
    const errorMessage = 'Ocurrió un error al actualizar el estado del pedido, intente nuevamente.';
    return this.executeWithBusy(async () => {
      const { data: itemSaved, error } = await OrdersQueryDomain.buildUpdateAllOrderItemsStatusQuery(
        this.client,
        orderId,
        status,
      );
      if (!error) {
        const isCompletedOrder = itemSaved.every(
          (item) => item.ItemStatusId === OrderItemStatusEnum.Completed || item.ItemStatusId === OrderItemStatusEnum.Cancelled,
        );
        if (isCompletedOrder) {
          await this.updateOrderStatus(orderId, OrderStatusEnum.Completed);
        }
      } else {
        throw new Error(errorMessage);
      }
      const rspOrder = await this.getById(orderId);
      if (rspOrder?.success) {
        return super.handleResponse<Order>(rspOrder.data as unknown as Order, error);
      } else {
        throw new Error(errorMessage);
      }
    }, 'Updating Order Item Status All');
  }

  private _saveOrUpdateOrder(order: Order, orderItems: OrderItem[]): Promise<ResponseResult<Order>> {
    return this.executeWithBusy(async () => {
      const { data: orderSaved, error } = await OrdersQueryDomain.buildUpdateOrderQuery(this.client, order, orderItems);
      if (error) throw error;

      if (orderSaved.id) {
        orderItems.forEach(async (item) => {
          item.OrderId = orderSaved.id;
          const { data: itemSaved, error } = await OrdersQueryDomain.buildUpdateOrderItemQuery(this.client, item);
          if (error) throw error;
          return itemSaved;
        });
      } else {
        throw new Error('Ocurrió un error al guardar el pedido, intente nuevamente.');
      }
      return super.handleResponse<Order>(orderSaved, error);
    }, 'Updating Order');
  }
}
