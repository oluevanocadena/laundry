import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../helper.page';
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

  @Input() showSelect: boolean = false;
  @Input() showCalendar: boolean = false;
  @Input() showColumns: boolean = false;
  @Input() showSort: boolean = false;

  @Output() onCTAClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit() {}
}
