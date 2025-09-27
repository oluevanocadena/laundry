import { Injectable } from '@angular/core';

import { Feedback } from '@bussiness/feedback/interfaces/feeback.interfaces';

import { FeedbackQueryDomain } from '@bussiness/feedback/domains/feeback.query.domain';
import { IFeedbackRepository } from '@bussiness/feedback/repository/feeback.repository';
import { OrdersQueryDomain } from '@bussiness/orders/domains/orders.query.domain';
import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class FeedbackSupabaseRepository extends SupabaseBaseApiService implements IFeedbackRepository {
  //Results
  pagedFeebacks = new SubjectProp<ResponseResult<Feedback[]>>(null);

  constructor() {
    super();
  }

  getPaged(request: PagedRequest): Promise<ResponseResult<Feedback[]>> {
    return this.executeWithBusy(async () => {
      // Construir query base y count query usando tu domain actual
      const query = FeedbackQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = FeedbackQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;

      this.pagedFeebacks.value = super.handleResponse<Feedback[]>(data as unknown as Feedback[], error, undefined, totalCount);
      return this.pagedFeebacks.value;
    }, 'Fetching Feedbacks');
  }

  save(feeback: Feedback): Promise<ResponseResult<Feedback>> {
    return this._saveOrUpdateOrder(feeback);
  }

  update(feedback: Feedback): Promise<ResponseResult<Feedback>> {
    return this._saveOrUpdateOrder(feedback);
  }

  delete(id: string): Promise<ResponseResult<Feedback>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await OrdersQueryDomain.buildDeleteOrderQuery(this.client, id);
      return super.handleResponse<Feedback>(data as unknown as Feedback, error);
    });
  }

  getById(id: string): Promise<ResponseResult<Feedback> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await OrdersQueryDomain.buildGetSingleOrderQuery(this.client, id);
      return super.handleResponse<Feedback>(data as unknown as Feedback, error);
    }, 'Fetching Feedback');
  }

  deleteMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrdersQueryDomain.buildDeleteOrdersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  toggleEnableStateMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = OrdersQueryDomain.buildToggleOrdersQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  private _saveOrUpdateOrder(feedback: Feedback): Promise<ResponseResult<Feedback>> {
    return this.executeWithBusy(async () => {
      if (feedback.id === null) {
        delete feedback.id;
      }
      const { data: feedbackSaved, error } = await FeedbackQueryDomain.buildUpdateFeedbackQuery(this.client, feedback);

      return super.handleResponse<Feedback>(feedbackSaved as unknown as Feedback, error);
    }, 'Updating Feedback');
  }
}
