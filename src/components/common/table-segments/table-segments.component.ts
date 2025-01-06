import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TableOptionsItem } from '../table-options/table-options.component';

@Component({
  selector: 'table-segments',
  standalone: false,
  templateUrl: './table-segments.component.html',
  styleUrls: ['./table-segments.component.scss'],
})
export class TableSegmentsComponent extends HelperPage implements OnInit {
  //Flag Management
  showOptions: boolean = false;

  //Input
  @Input() loading: boolean = false;

  //Form Group
  formGroup = new FormGroup({
    option: new FormControl<TableSegmentsItem | null>(null),
  });

  //Index
  indexTab: number = 0;

  //Arrays
  private _options: TableSegmentsItem[] = [];
  @Input() set options(value: TableSegmentsItem[]) {
    this._options = value;
    this.formGroup.get('option')?.setValue(value[0]);
  }
  get options() {
    return this._options;
  }

  //Outputs
  @Output() onTabChange: EventEmitter<TableSegmentsItemEvent> =
    new EventEmitter<TableSegmentsItemEvent>();

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onChangeTab(index: number) {
    this.formGroup.get('option')?.setValue(this.options[index]);
    this.onTabChange.emit({ index: index, item: this.options[index] });
  }

  onSelectOption(option: TableSegmentsItem) {
    this.formGroup.get('option')?.setValue(option);
    this.indexTab = this.options.findIndex(
      (x: TableSegmentsItem) => x.id === option.id
    );
    this.showOptions = false;
    this.onTabChange.emit({
      index: this.indexTab,
      item: this.options[this.indexTab],
    });
  }

  /**
   * Getters
   */
  get segment() {
    return this.formGroup.controls.option.value?.label;
  }

  /**
   * Life cycle
   */
  ngOnInit() {}
}

export interface TableSegmentsItem {
  id: number;
  label: string;
}

export interface TableSegmentsItemEvent {
  index: number;
  item: TableSegmentsItem;
}
