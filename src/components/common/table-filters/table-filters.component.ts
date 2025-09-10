import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/form-input/form-input.component';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';

@Component({
  selector: 'table-filters',
  standalone: false,
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent extends HelperPage {
  @Input() ctaLabel: string = '';
  @Input() columns: UITableColumn[] = [];
  @Input() options: UISelectOption[] = [{ id: '0', Name: 'Seleccione' }]; 

  @Input() showSelect: boolean = false;
  @Input() showCalendar: boolean = false;
  @Input() showColumns: boolean = false;
  @Input() showSort: boolean = false;

  @Output() onCTAClick: EventEmitter<void> = new EventEmitter<void>();

  //FormGroup
  formGroup = new FormGroup({
    select: new FormControl(),
    date: new FormControl(),
  });

  constructor() {
    super();
  }

  ngOnInit() {}
}
