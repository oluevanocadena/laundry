import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HelperPage } from '@components/common/helper.page';
import { UITableColumn } from '@globals/interfaces/ui.interfaces';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'modal-columns-table',
  standalone: false,
  templateUrl: './modal-columns-table.component.html',
  styleUrls: ['./modal-columns-table.component.scss'],
})
export class ModalColumnsTableComponent extends HelperPage implements OnInit {
  showModal = false;
  selectAll = false;

  private _originalColumns: UITableColumn[] = [];

  private _columns: UITableColumn[] = [];
  @Input() set columns(value: UITableColumn[]) {
    this._columns = UtilsDomain.clone(value);
    this.selectAll = this._columns?.every((column) => column.selected);
  }
  get columns() {
    return this._columns;
  }
  @Output() columnsChange = new EventEmitter<UITableColumn[]>();

  constructor() {
    super();
  }

  /**
   * UI Events
   */
  openModal() {
    this._originalColumns = UtilsDomain.clone(this.columns);
    this.showModal = true;
  }

  close(avoidChange: boolean = false) {
    this.showModal = false;
    if (!avoidChange) {
      this.columns = this._originalColumns;
    }
  }

  confirm() {
    this.showModal = false;
    this.columnsChange.emit(this.columns);
  }

  onColumnChange(column: UITableColumn) {
    this.selectAll = this.columns.every((c) => c.selected);
  }

  selectAllColumns() {
    this.columns.forEach((column) => {
      column.selected = this.selectAll;
    });
  }

  /**
   * Getters
   */

  get isIndeterminate() {
    const selectedColumns = this.columns.filter((column) => column.selected);
    return selectedColumns.length > 0 && selectedColumns.length < this.columns.length;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
