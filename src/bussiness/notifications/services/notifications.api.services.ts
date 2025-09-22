import { Injectable } from '@angular/core';

import { NotificationsQueryDomain } from '@bussiness/notifications/domains/notifications.query.domain';
import {
  Notification as INotification,
  NotificationPagedResults,
  NotificationRequest,
} from '@bussiness/notifications/interfaces/notifications.interfaces';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService extends ApiBaseService {
  public pagedNotifications = new SubjectProp<NotificationPagedResults>(null);

  private accountId = '';

  constructor() {
    super();
    this.accountId = this.sessionService.accountId;
  }

  getUnReadCount() {
    return this.executeWithBusy(async () => {
      const { data, error } = await NotificationsQueryDomain.buildUnReadCountQuery(this.client, this.accountId);
      return super.handleResponse(data, error);
    }, 'Fetching Unread Count');
  }

  getPagedNotifications(request: NotificationRequest) {
    return this.executeWithBusy(async () => {
      // Inicializar query base
      let query = NotificationsQueryDomain.buildQuery(request, this.client, this.accountId);
      // Consulta separada para obtener el conteo total sin filtros
      let totalCountQuery = NotificationsQueryDomain.buildTotalCountQuery(request, this.client, this.accountId);
      // Consulta separada para obtener el conteo de notificaciones no leídas
      const unReadCountQuery = NotificationsQueryDomain.buildUnReadCountQuery(this.client, this.accountId);

      // Ejecutar consultas
      const [queryResult, totalCountResult, unReadCountResult] = await Promise.all([query, totalCountQuery, unReadCountQuery]);

      // Obtener resultados
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count;
      const unReadCount = unReadCountResult.count;

      // Actualizar valor del observable
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

  markAsRead(id: string) {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Notifications).update({ Readed: true }).eq('id', id);
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }
}
