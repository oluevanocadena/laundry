import { OrderRequest } from '@bussiness/orders/interfaces/orders.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';

export class OrdersQueryDomain {
  static buildQuery(request: OrderRequest, client: SupabaseClient) {
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
      .eq('AccountId', request.accountId);

    // Aplicar filtro de StatusId solo si no es nulo/undefined
    if (request.statusId !== null && request.statusId !== undefined) {
      query = query.eq('StatusId', request.statusId);
    }

    if (request.locationId !== null && request.locationId !== undefined) {
      query = query.eq('LocationId', request.locationId);
    }

    // Aplicar filtros de fecha si están presentes
    if (request.dateFrom) {
      query = query.gte('createdAt', request.dateFrom); // o el campo de fecha que uses
    }

    if (request.dateTo) {
      query = query.lte('createdAt', request.dateTo); // o el campo de fecha que uses
    }

    // Aplicar paginación
    query = query.range(from, to);

    // Aplicar ordenamiento (por defecto created_at descendente)
    const sortBy = request.sortBy || 'createdAt';
    const sortOrder = request.sortOrder === 'asc';
    query = query.order(sortBy, { ascending: sortOrder });

    // Result Query
    return query;
  }

  static buildTotalCountQuery(request: OrderRequest, client: SupabaseClient) {
    let query = client
      .from(SupabaseTables.Notifications)
      .select('*', { count: 'exact', head: true })
      .eq('AccountId', request.accountId);

    if (request.locationId !== null && request.locationId !== undefined) {
      query = query.eq('LocationId', request.locationId);
    }

    return query;
  }
}
