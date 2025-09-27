import { IRepositoryReadOnly } from '@globals/interfaces/repository.interface';
import { UnitMeasure } from '../interfaces/product.unitmeasure.interfaces';
import { SubjectProp } from '@globals/types/subject.type';
import { ResponseResult } from '@globals/interfaces/requests.interface';

export abstract class IUnitMeasureRepository extends IRepositoryReadOnly<UnitMeasure> {
  abstract unitMeasures: SubjectProp<ResponseResult<UnitMeasure[]>>;
}
