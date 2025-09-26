import { Injectable } from '@angular/core';

import { NotificationsQueryDomain } from '@bussiness/notifications/domains/notifications.query.domain';
import {
  Notification as INotification,
  Notification,
  NotificationPagedResults,
  NotificationRequest,
} from '@bussiness/notifications/interfaces/notifications.interfaces';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService extends SupabaseBaseApiService {
  public pagedNotifications = new SubjectProp<NotificationPagedResults>(null);

  private accountId = '';

  constructor() {
    super();
    this.accountId = this.sessionService.accountId;
  }

  protected override getCacheStore(): ICacheStore {
    return new LocalStorageCacheStore(); //Define cache strategy
  }

  getUnReadCount(useCache = true) {
    const cacheKey = this.buildCacheKey(`unReadCount:${this.accountId}`, {});

    return this.getWithCache(
      cacheKey,
      async () => {
        const { data, error } = await NotificationsQueryDomain.buildUnReadCountQuery(this.client, this.accountId);
        return super.handleResponse(data, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
    );
  }

  getPagedNotifications(request: NotificationRequest, useCache = true) {
    const cacheKey = this.buildCacheKey(`pagedNotifications:${this.accountId}`, request);

    return this.getWithCache(
      cacheKey,
      async () => {
        // Inicializar query base
        let query = NotificationsQueryDomain.buildQuery(request, this.client, this.accountId);
        let totalCountQuery = NotificationsQueryDomain.buildTotalCountQuery(request, this.client, this.accountId);
        const unReadCountQuery = NotificationsQueryDomain.buildUnReadCountQuery(this.client, this.accountId);

        // Ejecutar consultas
        const [queryResult, totalCountResult, unReadCountResult] = await Promise.all([
          query,
          totalCountQuery,
          unReadCountQuery,
        ]);

        // Obtener resultados
        const { data, error } = queryResult;
        const totalCount = totalCountResult.count;
        const unReadCount = unReadCountResult.count;
        (data as unknown as Notification[]).forEach((notification) => {
          notification.Checked = false;
        });
        // Actualizar observable
        this.pagedNotifications.value = {
          data: data ?? [],
          count: totalCount ?? 0,
          unReadCount: unReadCount ?? 0,
        };

        return super.handleResponse(data, error, undefined, totalCount);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto,
      (cachedData) => {
        this.pagedNotifications.value = {
          data: cachedData,
          count: Array.isArray(cachedData) ? cachedData.length : 0,
          unReadCount: 0, // opcional: si quieres conservar el último
        };
      },
    );
  }

  markAllAsRead() {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkAllAsReadQuery(this.client, this.accountId);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

  markManyAsRead(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkManyAsReadQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

  markAsRead(id: string) {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkAsReadQuery(this.client, id);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

  deleteNotifications(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildDeleteNotificationsQuery(this.client, ids);
      const { data, error } = await query; 
      this.clearAllCaches();
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

}
