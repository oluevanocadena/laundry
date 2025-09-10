import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HelperPage } from '@components/common/helper.page';
import { UIPageSizesOptions, UITableConstants } from '@globals/constants/supabase-tables.constants';

import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';
import { UITablePagination } from '@globals/interfaces/ui.interfaces';

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
    page: new FormControl(UITableConstants.DefaultPage, [Validators.min(1)]),
    pageSize: new FormControl(UITableConstants.DefaultPageSize),
  });

  page = new FormProp<number>(this.formGroup, 'page', UITableConstants.DefaultPage);
  pageSize = new FormProp<number>(this.formGroup, 'pageSize', UITableConstants.DefaultPageSize);
  totalPages = new SubjectProp<number>(1);

  //Options
  pageSizesOptions = UIPageSizesOptions;

  @Output() onChange = new EventEmitter<UITablePagination>();

  constructor() {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.page.onChange((value) => {
      this.refresh();
    });

    this.pageSize.onChange((value) => {
      this._calcTotalPages(this.rowCount);
      this.refresh();
    });
  }

  /**
   * UI Events
   */

  refresh() {
    this.onChange.emit({
      page: this.page.value ?? UITableConstants.DefaultPage,
      pageSize: this.pageSize.value ?? UITableConstants.DefaultPageSize,
      rowCount: this.rowCount,
      totalPages: this.totalPages.value ?? 1,
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
