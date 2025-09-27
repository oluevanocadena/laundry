import { Injectable } from '@angular/core';

import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { IUnitMeasureRepository } from './unit.measure.repository';

@Injectable({
  providedIn: 'root',
})
export class UnitMeasureSupabaseRepository extends SupabaseBaseApiService implements IUnitMeasureRepository {
  //Results
  public unitMeasures = new SubjectProp<ResponseResult<UnitMeasure[]>>(null);

  constructor() {
    super();
  }

  getAll(): Promise<ResponseResult<UnitMeasure[]>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client.from(SupabaseTables.UnitMeasures).select('*').eq('Deleted', false);
      this.unitMeasures.value = super.handleResponse(data, error);
      return this.unitMeasures.value;
    }, 'Fetching Unit Measures');
  }

  getById(id: string): Promise<ResponseResult<UnitMeasure> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.UnitMeasures)
        .select('*')
        .eq('Deleted', false)
        .eq('Id', id)
        .single();
      return super.handleResponse(data, error);
    }, 'Fetching Unit Measure');
  }
}
