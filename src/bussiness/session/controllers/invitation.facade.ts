import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';
import { validators } from '@globals/types/validators.type';

@Injectable({
  providedIn: 'root',
})
export class InvitationFacade extends FacadeBase {
  formGroup = new FormGroup({
    password: new FormControl('', validators.Password),
    confirmPassword: new FormControl('', validators.Password),
  });

  pwd = new FormProp<string>(this.formGroup, 'password', '');
  pwdConfirm = new FormProp<string>(this.formGroup, 'confirmPassword', '');
  token = new SubjectProp<string>('');

  constructor(public api: SessionApiService, public router: Router, public nzMessageService: NzMessageService) {
    super(api);
  }

  override initialize() {}

  override bindEvents() {}

  override clearState() {}

  override submitForm() {}

  /**
   * UI Events
   */

  onClickSetPassword() {
    this.api.setPassword({ password: this.pwd.value!, token: this.token.value! }).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Contraseña establecida correctamente');
        this.router.navigate([routes.Login]);
      } else {
        this.nzMessageService.error('Ocurrió un error al establecer la contraseña, intenta nuevamente.');
      }
    });
  }
}
