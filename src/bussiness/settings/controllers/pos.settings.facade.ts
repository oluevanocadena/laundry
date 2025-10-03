import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@bussiness/session/services/session.service';
import { FacadeBase } from '@globals/types/facade.base';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IOrganizationsRepository } from '../repository/organizations.repository';

@Injectable({
  providedIn: 'root',
})
export class PointOfSaleDraftFacade extends FacadeBase {
  formGroup = new FormGroup({
    organizationName: new FormControl('', [Validators.required]),
  });
  constructor(
    public repo: IOrganizationsRepository,
    public nzMessageService: NzMessageService,
    public sessionService: SessionService,
  ) {
    super(repo);
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}
}
