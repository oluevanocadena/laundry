import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TuiSizeS } from '@taiga-ui/core';

@Component({
  selector: 'table-options',
  standalone: false,
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent implements OnInit {
  //Flag Management
  show: boolean = false;

  //INputs
  @Input() item: any;
  @Input() options: TableOptionsItem[] = [];
  @Input() groupName?: string = undefined;
  @Input() buttonSize: 'm' | 'l' | 'xl' | 's' | 'xs' = 's';
  @Input() maxHeight: number = 500;
  @Input() rounded: boolean = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  /**
   * UI Events
   */
  onClickOption(option: TableOptionsItem) {
    this.onSelect.emit({ item: this.item, option });
  }

  /**
   * Life Cycle
   */
  ngOnInit() {}
}

export interface TableOptionsItem {
  label: string;
  icon: string;
  id: number;
}

export interface TableOptionItemSelectEvent {
  item: any;
  option: TableOptionsItem;
}
