import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import { ReadOnlyRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IUnitMeasureRepository extends ReadOnlyRepository<UnitMeasure> {
  abstract unitMeasures: SubjectProp<ResponseResult<UnitMeasure[]>>;
}
