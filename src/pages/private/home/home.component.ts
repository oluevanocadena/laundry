import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/form-input/form-input.component';
import { FormProp } from '@type/form.type';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends HelperPage {
  formGroup = new FormGroup({
    period: new FormControl(),
  });

  periods: UISelectOption[] = [
    {
      id: '1',
      Name: 'Últimos 60 minutos',
    },
  ];

  period = new FormProp(this.formGroup, 'period');

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  get organizationName() {
    return 'Brikerr Lavandería';
  }

  /**
   * LifeCycle
   */

  ngOnInit() {}
}
