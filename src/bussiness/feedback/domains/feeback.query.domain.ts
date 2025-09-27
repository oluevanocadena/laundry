import { SupabaseClient } from '@supabase/supabase-js';

import { Feedback } from '@bussiness/feedback/interfaces/feeback.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedRequest } from '@globals/interfaces/requests.interface';

export class FeedbackQueryDomain {
  static buildQuery(request: PagedRequest, client: SupabaseClient, sessionService: SessionService) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    return client
      .from(SupabaseTables.Feedbacks)
      .select('*')
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
  }

  static buildTotalCountQuery(request: PagedRequest, client: SupabaseClient, sessionService: SessionService) {
    return client
      .from(SupabaseTables.Feedbacks)
      .select('*', { count: 'exact', head: true })
      .eq('OrganizationId', sessionService.organizationId)
      .eq('Deleted', false);
  }

  static buildDeleteFeedbackQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Feedbacks).update({ Deleted: true }).in('id', ids).select();
  }

  static buildToggleFeedbackQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('feedback_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }

  static buildUpdateFeedbackQuery(client: SupabaseClient, feedback: Feedback) {
    return client.from(SupabaseTables.Feedbacks).upsert(feedback).select();
  }
}
