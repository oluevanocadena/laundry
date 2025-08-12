import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-products-draft',
  standalone: false,
  templateUrl: './products-draft.component.html',
  styleUrls: ['./products-draft.component.scss'],
})
export class ProductsDraftComponent extends HelperPage {
  constructor() {
    super();
  }

  /**
   * UI Events
   */

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
