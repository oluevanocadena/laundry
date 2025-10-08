import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { HelperPage } from '@components/common/helper.page';
import { ModalColumnsSort } from '@components/common/modal-columns-sort/modal-columns-sort.component';
import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';
import { FormProp } from '@globals/types/form.type';
import { PagedRequest } from '@globals/interfaces/requests.interface';

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
  @Input() segments: NzSegmentedOption[] = [];

  @Input() showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: false,
    sort: false,
  };
  @Input() defaultSortBy: string | null = null;

  private _tableFilter: PagedRequest | null = UIDefaultTableFilter;
  @Input() set tableFilter(value: PagedRequest | null) {
    this._tableFilter = value;
  }
  get tableFilter() {
    return this._tableFilter;
  }

  @Output() onCtaClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onFiltersChange = new EventEmitter<PagedRequest>();

  //FormGroup
  formGroup = new FormGroup({
    select: new FormControl(),
    date: new FormControl<Date[]>([]),
  });

  public date = new FormProp<Date[]>(this.formGroup, 'date');
  public select = new FormProp<string>(this.formGroup, 'select');

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
          ...(this.tableFilter as PagedRequest),
          dateFrom: dateRange[0],
          dateTo: dateRange[1],
        });
      }
    });
    this.select.onChange((select) => {
      if (select) {
        this.onFiltersChange.emit({
          ...(this.tableFilter as PagedRequest),
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
      ...(this.tableFilter as PagedRequest),
      sortBy: sort.column,
      sortOrder: sort.order,
    });
  }

  onSearchChange(search: string) {
    this.onFiltersChange.emit({
      ...(this.tableFilter as PagedRequest),
      search: search,
    });
  }

  onSegmentChange(value: string | number) {
    this.onFiltersChange.emit({
      ...(this.tableFilter as PagedRequest),
      segment: value.toString(),
    });
  }

  /**
   * Getters
   */

  get showSelect() {
    return this.options && this.options.length > 0;
  }

  get showSegments() {
    return this.segments && this.segments.length > 0;
  }

  get showSort() {
    return this.showType.sort;
  }

  get showCalendar() {
    return this.showType.calendar;
  }

  get showColumns() {
    return this.showType.columns && this.columns && this.columns.length > 0;
  }

  ngOnInit() {}
}

export interface UITypeFilterShow {
  calendar: boolean;
  columns: boolean;
  search: boolean;
  sort: boolean;
}
