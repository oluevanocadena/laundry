import { Injectable } from '@angular/core';

import { ReportsQueryDomain } from '@bussiness/reports/domains/reports.query.domain';
import { ProductReport, SalesReport } from '@bussiness/reports/interfaces/reports.interfaces';
import { IReportsRepository } from '@bussiness/reports/repository/reports.repository';
import { ReportRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { LocalStorageCacheStore } from '@globals/strategies/cache/storage.cache.store';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class ReportsSupabaseRepository extends SupabaseBaseApiService implements IReportsRepository {
  //Results
  public salesReport = new SubjectProp<ResponseResult<SalesReport[]>>();
  public productsReport = new SubjectProp<ResponseResult<ProductReport[]>>();

  constructor() {
    super();
  }

  protected override getCacheStore(): ICacheStore {
    // Define cache strategy LocalStorageCacheStore| MemoryCacheStore
    return new LocalStorageCacheStore();
  }

  getReport(request: ReportRequest): Promise<ResponseResult<SalesReport[]>> {
    return this.executeWithBusy(async () => {
      const query = ReportsQueryDomain.buildGetReportQuery(this.client, this.sessionService, request);
      const { data, error } = await query;
      return super.buildReponse(data, error);
    }, 'Fetching Location');
  }
}
