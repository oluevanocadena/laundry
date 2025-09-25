import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AnalyticsApiService } from '@bussiness/analytics/services/analytics.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsFacade extends FacadeBase {
  formGroup = new FormGroup({
    period: new FormControl('1'),
  });

  periods: UISelectOption[] = [
    {
      id: '1',
      Name: 'Últimos 60 minutos',
    },
  ];

  period = new FormProp(this.formGroup, 'period', '1');
  locations = new SubjectProp<Location[]>([]);

  constructor(public api: AnalyticsApiService, public sessionService: SessionService) {
    super(api);
  }

  override bindEvents() {}

  override clearState() {}

  override submitForm() {}

  /**
   * API Calls
   */

  fetchAnalytics() {
    this.api.getAnalytics();
  }

  /**
   * Getters
   */

  get organizationName() {
    return this.sessionService.sessionInfo.value?.Account.Organization?.Name;
  }
}
