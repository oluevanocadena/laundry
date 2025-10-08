import { Injectable } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from '@bussiness/session/services/session.service';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';
import { IReportsRepository } from '../repository/reports.repository';

@Injectable({
  providedIn: 'root',
})
export class ReportsFacade extends FacadeBase {
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

  constructor(public repo: IReportsRepository, public sessionService: SessionService) {
    super(repo);
  }

  override initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */

  fetchStatistics() {
    this.repo.getReport({
      dateFrom: new Date().toISOString(),
      dateTo: new Date().toISOString(),
    });
  }

  /**
   * Getters
   */

  get organizationName() {
    return this.sessionService.sessionInfo.value?.Account.Organization?.Name;
  }
}
