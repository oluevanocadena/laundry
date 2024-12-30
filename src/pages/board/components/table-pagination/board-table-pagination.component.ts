import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UINavigationDirection } from '../../../../components/common/helper.table.page';

@Component({
  selector: 'board-table-pagination',
  standalone: false,
  templateUrl: './board-table-pagination.component.html',
  styleUrls: ['./board-table-pagination.component.scss'],
})
export class BoardTablePaginationComponent implements OnInit {
  // Emitters
  @Output() onDirectionChange: EventEmitter<UINavigationDirection> =
    new EventEmitter<UINavigationDirection>();

  constructor() {}

  /**
   * UI Events
   */

  direction(direction: UINavigationDirection) {
    this.onDirectionChange.emit(direction);
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
