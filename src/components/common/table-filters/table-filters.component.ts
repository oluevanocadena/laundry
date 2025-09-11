import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase } from '@globals/interfaces/ui.interfaces';
import { FormProp } from '@globals/types/form.type';
import moment from 'moment';
import { ModalColumnsSort } from '../modal-columns-sort/modal-columns-sort.component';

@Component({
  selector: 'table-filters',
  standalone: false,
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFiltersComponent extends HelperPage {
  private _columns: UITableColumn[] = [];
  @Input() set columns(value: UITableColumn[]) {
    this._columns = value;
  }
  get columns() {
    return this._columns;
  }
  @Output() columnsChange = new EventEmitter<UITableColumn[]>();

  @Input() ctaLabel: string = '';
  @Input() options: UISelectOption[] = [];

  @Input() showType: TypeFilterShow = {
    calendar: false,
    sort: false,
  };
  @Input() defaultSortBy: string | null = null;

  @Input() tableFilter: UITableFilterBase | null = UIDefaultTableFilter;

  @Output() onCtaClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFiltersChange = new EventEmitter<UITableFilterBase>();

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(),
    select: new FormControl(),
    date: new FormControl<Date[]>([]),
  });

  public date = new FormProp<Date[]>(this.formGroup, 'date');
  public select = new FormProp<string>(this.formGroup, 'select');
  public search = new FormProp<string>(this.formGroup, 'search');

  constructor() {
    super();
    const today = new Date();
    this.date.value = [today, today];
    this.bindEvents();
  }

  bindEvents() {
    this.date.onChange((dateRange) => {
      if (dateRange) {
        this.onFiltersChange.emit({
          ...(this.tableFilter as UITableFilterBase),
          dateFrom: dateRange[0],
          dateTo: dateRange[1],
        });
      }
    });
    this.select.onChange((select) => {
      if (select) {
        this.onFiltersChange.emit({
          ...(this.tableFilter as UITableFilterBase),
          select: select,
        });
      }
    });
  }

  /**
   * UI Events
   */

  onSortChange(sort: ModalColumnsSort) {
    this.onFiltersChange.emit({
      ...(this.tableFilter as UITableFilterBase),
      sortBy: sort.column,
      sortOrder: sort.order,
    });
  }

  onSearchChange(search: string) {
    this.onFiltersChange.emit({
      ...(this.tableFilter as UITableFilterBase),
      search: search,
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

  get showSort() {
    return this.showType.sort;
  }

  get showCalendar() {
    return this.showType.calendar;
  }

  ngOnInit() {}
}

export interface TypeFilterShow {
  calendar: boolean;
  sort: boolean;
}
