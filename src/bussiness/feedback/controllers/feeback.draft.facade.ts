import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IFeedbackRepository } from '@bussiness/feedback/repository/feeback.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { FeedbackTypeEnum } from '../enums/feeback.enums';
import { NzMessageService } from 'ng-zorro-antd/message';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showModalFeeback: boolean = false;

  public formGroup = new FormGroup({
    type: new FormControl(FeedbackTypeEnum.Idea, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  public type = new FormProp<string>(this.formGroup, 'type', FeedbackTypeEnum.Idea);
  public title = new FormProp<string>(this.formGroup, 'title');
  public description = new FormProp<string>(this.formGroup, 'description');

  options: UISelectOption[] = [
    { id: FeedbackTypeEnum.Idea, Name: 'Idea' },
    { id: FeedbackTypeEnum.Suggestion, Name: 'Sugerencia' },
  ];

  constructor(
    public repo: IFeedbackRepository,
    public sessionService: SessionService,
    public nzMessageService: NzMessageService,
  ) {
    super(repo);
  }

  override initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {
    if (this.formGroup.valid) {
      this.repo
        .save({
          Type: this.type.value as FeedbackTypeEnum,
          Title: this.title.value || '',
          Description: this.description.value || '',
          OrganizationId: this.sessionService.organizationId,
          AccountId: this.sessionService.sessionInfo.value?.Account.id || '',
          created_At: moment().format('YYYY-MM-DD HH:mm:ss'),
          id: null,
        })
        .then((res) => {
          if (res.success) {
            this.showModalFeeback = false;
            this.nzMessageService.success('Opinión enviada correctamente');
          } else {
            this.nzMessageService.error('Ocurrió un error al enviar la opinión, intenta nuevamente.');
          }
        });
    } else {
      this.nzMessageService.info('Por favor, completa todos los campos requeridos.😉');
    }
  }

  /**
   * UI Events
   */

  openFeebackModal() {
    this.showModalFeeback = true;
  }

  closeFeebackModal() {
    this.showModalFeeback = false;
  }
}
