import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/form-input/form-input.component';
import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase } from '@globals/interfaces/ui.interfaces';
import { FormProp } from '@globals/types/form.type';
import moment from 'moment';

@Component({
  selector: 'table-filters',
  standalone: false,
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent extends HelperPage {
  @Input() ctaLabel: string = '';
  @Input() columns: UITableColumn[] = [];
  @Input() options: UISelectOption[] = [];

  @Input() showCalendar: boolean = false;
  @Input() showSort: boolean = false;

  @Output() onCTAClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFiltersChange = new EventEmitter<UITableFilterBase>();

  private _tableFilter: UITableFilterBase = UIDefaultTableFilter;
  @Input() set tableFilter(value: UITableFilterBase) {
    this._tableFilter = value;
    if (value) {
      const startDate = typeof value.dateFrom === 'string' ? moment(value.dateFrom).toDate() : value.dateFrom;
      const endDate = typeof value.dateTo === 'string' ? moment(value.dateTo).toDate() : value.dateTo;
      this.date.value = [startDate!, endDate!];
    } else {
      const today = new Date();
      this.date.value = [today, today];
    }
  }
  get tableFilter() {
    return this._tableFilter;
  }
  @Output() tableFilterChange = new EventEmitter<UITableFilterBase>();

  //FormGroup
  formGroup = new FormGroup({
    select: new FormControl(),
    date: new FormControl<Date[]>([]),
  });

  public date = new FormProp<Date[]>(this.formGroup, 'date');

  constructor() {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.date.onChange((dateRange) => {
      if (dateRange) {
        this.onFiltersChange.emit({
          dateFrom: dateRange[0],
          dateTo: dateRange[1],
          statusId: null,
          sortBy: null,
          sortOrder: 'asc',
        });
      }
    });
  }

  /**
   * Getters
   */

  get showSelect() {
    return this.options && this.options.length > 0;
  }

  get showColumns() {
    return this.columns && this.columns.length > 0;
  }

  ngOnInit() {}
}
