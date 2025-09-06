import { Injectable } from "@angular/core";
import { SessionService } from "@bussiness/session/services/session.service";
import { supabase } from "@environments/environment";
import { SupabaseTables } from "@globals/constants/supabase-tables.constants";
import { BusyProp } from "@globals/types/busy.type";
import { FacadeApiBase } from "@globals/types/facade.base";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root',
})
export class ReportsApiService implements FacadeApiBase {
  public busy = new BusyProp(false);
  public client: SupabaseClient;
 
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

  getStatistics() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.Statistics).select('*');
      if (error) throw error;
      return data;
    });
  }
}