import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import { IRepositoryReadOnly } from '@globals/interfaces/repository.interface';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IUnitMeasureRepository extends IRepositoryReadOnly<UnitMeasure> {
  abstract unitMeasures: SubjectProp<ResponseResult<UnitMeasure[]>>;
}
