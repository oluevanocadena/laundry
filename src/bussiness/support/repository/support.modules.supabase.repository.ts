import { Injectable } from '@angular/core';

import { SupportTicketModule } from '@bussiness/support/interfaces/support.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { ISupportModulesRepository } from './support.modules.repository';

@Injectable({
  providedIn: 'root',
})
export class SupportModulesSupabaseRepository extends SupabaseBaseApiService implements ISupportModulesRepository {
  //Results
  public supportModules = new SubjectProp<ResponseResult<SupportTicketModule[]>>(null);

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<SupportTicketModule[]>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.SupportTicketModules).select('*').eq('Deleted', false);
      this.supportModules.value = super.handleResponse(data, error);
      return this.supportModules.value;
    }, 'Fetching Unit Measures');
  }

  getById(id: string): Promise<ResponseResult<SupportTicketModule> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.SupportTicketModules)
        .select('*')
        .eq('Deleted', false)
        .eq('Id', id)
        .single();
      return super.handleResponse(data, error);
    }, 'Fetching Support Module');
  }
}
