import { OrderRequest } from '@bussiness/orders/interfaces/orders.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';
import moment from 'moment';

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
}
