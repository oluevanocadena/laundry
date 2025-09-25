import { Component, Input, OnInit } from '@angular/core';

import { HelperPage } from '@components/common/helper.page';
import { UITableActions } from '@globals/interfaces/ui.interfaces';

@Component({
  selector: 'table-actions',
  standalone: false,
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent extends HelperPage implements OnInit {
  @Input() selectedRows: any[] = [];
  @Input() actions: UITableActions[] = [];

  constructor() {
    super();
  }

  ngOnInit() {}
}
