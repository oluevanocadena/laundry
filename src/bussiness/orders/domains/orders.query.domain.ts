import { SupabaseClient } from '@supabase/supabase-js';
import moment from 'moment';

import { OrderItemStatusEnum, OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { OrderRequest } from '@bussiness/orders/repository/orders.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class OrdersQueryDomain {
  static buildQuery(request: OrderRequest, client: SupabaseClient, sessionService: SessionService) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    let query = client
      .from(SupabaseTables.Orders)
      .select(
        `*, 
          OrderItems: ${SupabaseTables.OrderItems}(*, 
            Product: ${SupabaseTables.Products}(*),  
            ItemStatus: ${SupabaseTables.OrderItemStatuses}(*),
            UnitMeasure: ${SupabaseTables.UnitMeasures}(*)
          ),
          Customer: ${SupabaseTables.Customers}(*),
          Location: ${SupabaseTables.Locations}(*),
          Organization: ${SupabaseTables.Organizations}(*),
          OrderStatus: ${SupabaseTables.OrderStatuses}(*)`,
      )
      .eq('Deleted', false)
      .eq('OrganizationId', sessionService.organizationId);

    // Aplicar filtro de StatusId solo si no es nulo/undefined
    if (request.accountId !== null && request.accountId !== undefined) {
      query = query.eq('AccountId', request.accountId);
    }

    // Aplicar filtro de StatusId solo si no es nulo/undefined
    if (request.select !== null && request.select !== undefined) {
      query = query.eq('StatusId', request.select);
    }

    if (request.locationId !== null && request.locationId !== undefined) {
      query = query.eq('LocationId', request.locationId);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();

      // Busca en campos propios de Orders
      query = query.or(
        [
          `OrderNumber.ilike.%${searchTerm}%`,
          `CustomerName.ilike.%${searchTerm}%`,
          `Notes.ilike.%${searchTerm}%`,
          `PaymentMethod.ilike.%${searchTerm}%`,
          `PaymentCardTransactionNumber.ilike.%${searchTerm}%`,
          `DeliveryType.ilike.%${searchTerm}%`,
          `DeliveryIndications.ilike.%${searchTerm}%`,
          `DeliveryAddress.ilike.%${searchTerm}%`,
          `DeliveryTrackingNumber.ilike.%${searchTerm}%`,
          `DeliveryTransportCompany.ilike.%${searchTerm}%`,
        ].join(','),
      );
    }

    if (request.dateFrom) {
      query = query.gte('createdAt', moment(request.dateFrom).startOf('day').toISOString());
    }

    if (request.dateTo) {
      query = query.lt('createdAt', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    }

    // Aplicar paginación
    query = query.range(from, to);

    // Aplicar ordenamiento (por defecto created_at descendente)
    const sortBy = request.sortBy || 'createdAt';
    const sortOrder = request.sortOrder ? request.sortOrder === 'desc' : false;
    query = query.order(sortBy, { ascending: sortOrder });

    // Result Query
    return query;
  }

  static buildTotalCountQuery(request: OrderRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.Orders)
      .select('*', { count: 'exact', head: true })
      .eq('Deleted', false)
      .eq('OrganizationId', sessionService.organizationId);
    if (request.locationId !== null && request.locationId !== undefined) {
      query = query.eq('LocationId', request.locationId);
    }
    if (request.dateFrom) {
      query = query.gte('createdAt', moment(request.dateFrom).startOf('day').toISOString());
    }

    if (request.dateTo) {
      query = query.lt('createdAt', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    }

    return query;
  }

  static buildDeleteOrdersQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Orders).update({ Deleted: true }).in('id', ids).select('*');
  }

  static buildToggleOrdersQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('orders_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }

  static buildGetSingleOrderQuery(client: SupabaseClient, id: string) {
    return client
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
  }

  static buildUpdateOrderQuery(client: SupabaseClient, order: Order, orderItems: OrderItem[]) {
    return client.from(SupabaseTables.Orders).upsert(order).select().single();
  }

  static buildUpdateOrderItemQuery(client: SupabaseClient, orderItem: OrderItem) {
    return client.from(SupabaseTables.OrderItems).upsert(orderItem).select().single();
  }

  static buildUpdateAllOrderItemsStatusQuery(client: SupabaseClient, orderId: string, status: OrderItemStatusEnum) {
    return client.from(SupabaseTables.OrderItems).update({ ItemStatusId: status }).eq('OrderId', orderId).select();
  }

  static buildDeleteOrderQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Orders).update({ Deleted: true }).eq('id', id).single();
  }

  static buildUpdateOrderStatusQuery(client: SupabaseClient, id: string, status: boolean) {
    return client.from(SupabaseTables.Orders).update({ Disabled: status }).eq('id', id).select().single();
  }
}
