import { Injectable } from '@angular/core';
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { BusyProp } from '@globals/types/busy.type';
import { FacadeApiBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;

  public notifications = new SubjectProp<Notification[]>([]);

  constructor(
    public nzMessageService: NzMessageService,
    public sessionService: SessionService
  ) {
    this.client = createClient(supabase.url, supabase.key);
  }

  private async executeWithBusy<T>(
    callback: () => Promise<T>,
    message?: string
  ): Promise<T | null> {
    this.busy.value = true;
    try {
      const result = await callback();
      return result;
    } catch (error) {
      this.nzMessageService.error(
        '¡Ocurrió un error al intentar realizar la acción! ⛔'
      );
      console.error('⛔ Error:', error);
      return null;
    } finally {
      this.busy.value = false;
    }
  }

  getNotifications() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .select('*');
      if (error) throw error;
      this.notifications.value = data as unknown as Notification[];
      return data;
    });
  }

  markAllAsRead() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .update({ Readed: true })
        .eq('Readed', false);
      if (error) throw error;
      this.notifications.value = data as unknown as Notification[];
      return data;
    });
  }
}
