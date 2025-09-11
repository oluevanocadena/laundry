import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HelperPage } from '@components/common/helper.page';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'modal-columns-sort',
  standalone: false,
  templateUrl: './modal-columns-sort.component.html',
  styleUrls: ['./modal-columns-sort.component.scss'],
})
export class ModalColumnsSortComponent extends HelperPage implements OnInit {
  showModal = false;
  isAsc = false;
  selectedColumn = '';
  originalColumn = '';

  @Input() defaultSortBy: string | null = null;

  private _columns: UITableColumn[] = [];
  @Input() set columns(value: UITableColumn[]) {
    this._columns = UtilsDomain.clone(value);
  }
  get columns() {
    return this._columns;
  }
  @Output() onSortChange = new EventEmitter<ModalColumnsSort>();

  constructor() {
    super();
  }

  /**
   * UI Events
   */
  openModal() {
    this.originalColumn = this.selectedColumn || this.defaultSortBy || '';
    this.selectedColumn = this.selectedColumn || this.defaultSortBy || '';
    this.showModal = true;
  }

  close() {
    this.selectedColumn = this.originalColumn;
    this.showModal = false;
  }

  confirm() {
    this.showModal = false;
    this.originalColumn = this.selectedColumn;
    this.onSortChange.emit({
      column: this.selectedColumn,
      order: this.isAsc ? 'asc' : 'desc',
    });
  }

  onColumnChange(column: UITableColumn) {
    this.isAsc = this.columns.every((c) => c.selected);
  }

  selectAllColumns() {
    this.columns.forEach((column) => {
      column.selected = this.isAsc;
    });
  }

  /**
   * Getters
   */

  get selectedColumnName() {
    return this.columns.find((column) => column.key === (this.selectedColumn || this.defaultSortBy))?.label;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export interface ModalColumnsSort {
  column: string;
  order: 'asc' | 'desc';
}
