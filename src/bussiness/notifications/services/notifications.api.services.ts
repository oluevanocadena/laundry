import { Injectable } from '@angular/core';

import {
  Notification as INotification,
  NotificationPagedResults,
  NotificationRequest,
} from '@bussiness/notifications/interfaces/notifications.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService extends ApiBaseService {
  public pagedNotifications = new SubjectProp<NotificationPagedResults>(null);

  private accountId = '';

  constructor(private sessionService: SessionService) {
    super();
    this.accountId = this.sessionService.accountId;
  }

  getPagedNotifications(request: NotificationRequest) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    return this.executeWithBusy(async () => {
      let query = this.client
        .from(SupabaseTables.Notifications)
        .select('*')
        .eq('AccountId', this.accountId)
        .range(from, to)
        .order('created_At', { ascending: false });

      if (request.readed !== null) {
        query = query.eq('Readed', request.readed);
      }

      // Consulta separada para obtener el conteo total sin filtros
      const totalCountQuery = this.client
        .from(SupabaseTables.Notifications)
        .select('*', { count: 'exact', head: true })
        .eq('AccountId', this.accountId);

      const unReadCountQuery = this.client
        .from(SupabaseTables.Notifications)
        .select('*', { count: 'exact', head: true })
        .eq('AccountId', this.accountId)
        .eq('Readed', false);

      const [queryResult, totalCountResult, unReadCountResult] = await Promise.all([
        query,
        totalCountQuery,
        unReadCountQuery,
      ]);

      const { data, error } = queryResult;
      const totalCount = totalCountResult.count;
      const unReadCount = unReadCountResult.count; 

      this.pagedNotifications.value = {
        data: data ?? [],
        count: totalCount ?? 0,
        unReadCount: unReadCount ?? 0,
      };
      return super.handleResponse(data, error, undefined, totalCount);
    });
  }

  markAllAsRead() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .update({ Readed: true })
        .eq('AccountId', this.accountId)
        .eq('Readed', false);
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }
}
