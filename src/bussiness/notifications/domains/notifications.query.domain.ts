import { NotificationRequest } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseClient } from '@supabase/supabase-js';

export class NotificationsQueryDomain {
  static buildQuery(request: NotificationRequest, client: SupabaseClient, accountId: string) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    let query = client.from(SupabaseTables.Notifications).select('*').eq('AccountId', accountId).range(from, to);

    if (request.readed !== null && request.readed !== undefined) {
      query = query.eq('Readed', request.readed);
    }

    // if (request.dateFrom) {
    //   query = query.gte('created_At', moment(request.dateFrom).startOf('day').toISOString());
    // }

    // if (request.dateTo) {
    //   query = query.lt('created_At', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    // }

    const sortBy = request.sortBy || 'created_At';
    const sortOrder = request.sortOrder ? request.sortOrder === 'asc' : true;
    query = query.order(sortBy, { ascending: sortOrder });

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();

      // Busca en campos propios de Notifications
      query = query.or([`Title.ilike.%${searchTerm}%`, `Message.ilike.%${searchTerm}%`].join(','));
    }

    return query;
  }

  static buildTotalCountQuery(request: NotificationRequest, client: SupabaseClient, accountId: string) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    let totalCountQuery = client
      .from(SupabaseTables.Notifications)
      .select('*', { count: 'exact', head: true })
      .eq('AccountId', accountId);

    // if (request.dateFrom) {
    //   totalCountQuery = totalCountQuery.gte('created_At', moment(request.dateFrom).startOf('day').toISOString());
    // }

    // if (request.dateTo) {
    //   totalCountQuery = totalCountQuery.lt('created_At', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    // }

    if (request.readed !== null && request.readed !== undefined) {
      totalCountQuery = totalCountQuery.eq('Readed', request.readed);
    }

    return totalCountQuery;
  }

  static buildUnReadCountQuery(client: SupabaseClient, accountId: string) {
    return client
      .from(SupabaseTables.Notifications)
      .select('*', { count: 'exact', head: true })
      .eq('AccountId', accountId)
      .eq('Readed', false);
  }

  static buildMarkAllAsReadQuery(client: SupabaseClient, accountId: string) {
    return client.from(SupabaseTables.Notifications).update({ Readed: true }).eq('AccountId', accountId).eq('Readed', false).select();
  }

  static buildMarkAsReadQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Notifications).update({ Readed: true }).eq('id', id).select();
  }

  static buildMarkManyAsReadQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Notifications).update({ Readed: true }).in('id', ids).select();
  }

  static buildDeleteNotificationsQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Notifications).delete().in('id', ids).select();
  }

  // Métodos adicionales para el repository
  static buildGetAllQuery(client: SupabaseClient, accountId: string) {
    return client
      .from(SupabaseTables.Notifications)
      .select('*')
      .eq('AccountId', accountId)
      .order('created_At', { ascending: false });
  }

  static buildGetByIdQuery(client: SupabaseClient, accountId: string, id: string) {
    return client
      .from(SupabaseTables.Notifications)
      .select('*')
      .eq('AccountId', accountId)
      .eq('id', id)
      .single();
  }

  static buildDeleteQuery(client: SupabaseClient, accountId: string, id: string) {
    return client
      .from(SupabaseTables.Notifications)
      .delete()
      .eq('AccountId', accountId)
      .eq('id', id)
      .select('*')
      .single();
  }
}
