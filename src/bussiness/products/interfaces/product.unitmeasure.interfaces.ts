import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { UnitMeasureType } from '@bussiness/products/Types/products.types';

export interface UnitMeasure extends UISelectOption {
  id: string;
  Name: string;
  UnitType: UnitMeasureType;
  Abbreviation: string;
  Deleted?: boolean;
}
