import { Injectable } from '@angular/core';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService extends ApiBaseService {
  public notifications = new SubjectProp<Notification[]>([]);
  public unReadNotifications = new SubjectProp<number>(0);

  constructor(public sessionService: SessionService) {
    super();
  }

  getCountUnreadNotifications() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .select('*')
        .eq(
          'AccountId',
          this.sessionService.sessionInfo.value?.Account?.id ?? ''
        )
        .eq('Readed', false);
      this.unReadNotifications.value = data?.length ?? 0;
      return super.handleResponse(data as unknown as Notification[], error);
    });
  }

  getNotifications() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .select('*');
      if (error) throw error;
      this.notifications.value = data as unknown as Notification[];
      return super.handleResponse(data as unknown as Notification[], error);
    });
  }

  markAllAsRead() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .update({ Readed: true })
        .eq('Readed', false);
      return super.handleResponse(data as unknown as Notification[], error);
    });
  }

  /**
   * Broacast Listen Notifications
   */

  listenNotifications(callback: (payload: any) => void) {
    const accountId = this.sessionService.sessionInfo.value?.Account?.id ?? '';
    this.client
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Notifications',
          filter: `AccountId=eq.${accountId}`,
        },
        (payload) => {
          const n: Notification = {
            id: payload.new['id'],
            created_At: payload.new['created_At'],
            updated_At: payload.new['updated_At'],
            Title: payload.new['Title'],
            Message: payload.new['Message'],
            Entity: payload.new['Entity'],
            Event: payload.new['Event'],
            Metadata: payload.new['Metadata'],
            Readed: payload.new['Readed'],
            AccountId: payload.new['AccountId'],
            OrganizationId: payload.new['OrganizationId'],
          };
          callback(n);
        }
      )
      .subscribe();
  }
}
