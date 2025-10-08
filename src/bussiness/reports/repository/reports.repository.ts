import { ReportRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { ICacheStore } from '@globals/types/cache.type';
import { SubjectProp } from '@globals/types/subject.type';
import { ProductReport, SalesReport } from '../interfaces/reports.interfaces';

export abstract class IReportsRepository extends ReportRepository<SalesReport> {
  // Subjects Results
  abstract salesReport: SubjectProp<ResponseResult<SalesReport[]>>;
  abstract productsReport: SubjectProp<ResponseResult<ProductReport[]>>;
  abstract cacheStore: ICacheStore;
}
