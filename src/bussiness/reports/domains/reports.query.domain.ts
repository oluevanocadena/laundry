import { SupabaseClient } from '@supabase/supabase-js';
import { ReportRequest } from '@globals/interfaces/requests.interface';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class ReportsQueryDomain {
  static buildGetReportQuery(client: SupabaseClient, sessionService: SessionService, request: ReportRequest) {
    return client
      .from(SupabaseTables.Orders)
      .select('*')
      .eq('organization_id', sessionService.organizationId)
      .eq('created_at', request.dateFrom)
      .eq('created_at', request.dateTo);
  }
}
