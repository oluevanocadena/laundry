import { Injectable } from '@angular/core';

import { NotificationsQueryDomain } from '@bussiness/notifications/domains/notifications.query.domain';
import {
  Notification,
  NotificationRequest,
  NotificationPagedResults,
} from '@bussiness/notifications/interfaces/notifications.interfaces';
import { INotificationsRepository } from '@bussiness/notifications/repository/notifications.repository';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsSupabaseRepository extends SupabaseBaseApiService implements INotificationsRepository {
  //Results
  public pagedNotifications = new SubjectProp<NotificationPagedResults>(null);
  public override cacheStore = new LocalStorageCacheStore();

  private accountId = '';

  constructor() {
    super();
    this.accountId = this.sessionService.accountId;
  }

  protected override getCacheStore(): ICacheStore {
    return this.cacheStore;
  }

  getAll(): Promise<ResponseResult<Notification[]>> {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildGetAllQuery(this.client, this.accountId);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    }, 'Fetching Notifications');
  }

  getById(id: string): Promise<ResponseResult<Notification> | null> {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildGetByIdQuery(this.client, this.accountId, id);
      const { data, error } = await query;
      return super.handleResponse(data, error);
    }, 'Fetching Notification');
  }

  getPaged(request: NotificationRequest) {
    const cacheKey = this.buildCacheKey(`pagedNotifications:${this.accountId}`, request);
    const useCache = true;
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

  async save(notification: Notification): Promise<ResponseResult<Notification>> {
    return this.executeWithBusy(async () => {
      // Las notificaciones generalmente se crean por el sistema, no por el usuario
      // Este método podría implementarse si es necesario
      throw new Error('Save operation not supported for notifications');
    }, 'Saving Notification');
  }

  async update(notification: Notification): Promise<ResponseResult<Notification>> {
    return this.executeWithBusy(async () => {
      // Las notificaciones generalmente no se actualizan, solo se marcan como leídas
      // Este método podría implementarse si es necesario
      throw new Error('Update operation not supported for notifications');
    }, 'Updating Notification');
  }

  async disable(id: string, state: boolean): Promise<ResponseResult<Notification>> {
    return this.executeWithBusy(async () => {
      // Las notificaciones no tienen estado de habilitado/deshabilitado
      throw new Error('Disable operation not supported for notifications');
    }, 'Disabling Notification');
  }

  async delete(id: string) {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildDeleteQuery(this.client, this.accountId, id);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data, error);
    }, 'Deleting Notification');
  }

  deleteMany(ids: string[]) {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildDeleteNotificationsQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      // Las notificaciones no tienen estado de habilitado/deshabilitado
      throw new Error('ToggleEnableMany operation not supported for notifications');
    }, 'ToggleEnableMany Notification');
  }

  getUnReadCount(useCache = true): Promise<ResponseResult<number>> {
    const cacheKey = this.buildCacheKey(`unReadCount:${this.accountId}`, {});

    return this.getWithCache(
      cacheKey,
      async () => {
        const { data, error } = await NotificationsQueryDomain.buildUnReadCountQuery(this.client, this.accountId);
        return super.handleResponse(data as unknown as number, error);
      },
      useCache ? 60_000 : 0, // TTL de 1 minuto
    );
  }

  markAllAsRead(): Promise<ResponseResult<Notification[]>> {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkAllAsReadQuery(this.client, this.accountId);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as Notification[], error);
    });
  }

  markAsRead(id: string): Promise<ResponseResult<Notification>> {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkAsReadQuery(this.client, id);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as Notification, error);
    });
  }

  markManyAsRead(ids: string[]): Promise<ResponseResult<Notification[]>> {
    return this.executeWithBusy(async () => {
      const query = NotificationsQueryDomain.buildMarkManyAsReadQuery(this.client, ids);
      const { data, error } = await query;
      this.clearAllCaches();
      return super.handleResponse(data as unknown as Notification[], error);
    });
  }
}
