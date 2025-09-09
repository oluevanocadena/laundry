import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/form-input/form-input.component';
import { UIPageSizesOptions, UITableConstants } from '@globals/constants/supabase-tables.constants';

import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';
import { TablePagination } from '@globals/types/types';

@Component({
  selector: 'table-pagination',
  standalone: false,
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent extends HelperPage implements OnInit {
  // Input
  private _rowCount: number = 0;
  @Input() set rowCount(value: number) {
    this._rowCount = value;
    this._calcTotalPages(value);
  }
  get rowCount() {
    return this._rowCount;
  }

  // FormGroup
  formGroup = new FormGroup({
    page: new FormControl(UITableConstants.DefaultPage),
    pageSize: new FormControl(UITableConstants.DefaultPageSize),
  });

  page = new FormProp<number>(this.formGroup, 'page', UITableConstants.DefaultPage);
  pageSize = new FormProp<number>(this.formGroup, 'pageSize', UITableConstants.DefaultPageSize);
  totalPages = new SubjectProp<number>(0);

  //Options
  pageSizesOptions = UIPageSizesOptions;

  @Output() onChange = new EventEmitter<TablePagination>();

  constructor() {
    super();
  }

  bindEvents() {
    this.page.onChange((value) => {
      this.refresh();
    });

    this.pageSize.onChange((value) => {
      console.log('👉🏽 pageSize', value);
      this._calcTotalPages(this.rowCount);
      this.refresh();
    });
  }

  /**
   * UI Events
   */

  refresh() {
    console.log('👉🏽 refresh', this.page.value, this.pageSize.value, this.rowCount, this.totalPages.value);
    this.onChange.emit({
      page: this.page.value ?? UITableConstants.DefaultPage,
      pageSize: this.pageSize.value ?? UITableConstants.DefaultPageSize,
      rowCount: this.rowCount,
      totalPages: this.totalPages.value ?? 0,
    });
  }

  /**
   * Private Methods
   */

  _calcTotalPages(total: number) {
    this.totalPages.value = Math.ceil(total / (this.pageSize.value ?? 0));
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
