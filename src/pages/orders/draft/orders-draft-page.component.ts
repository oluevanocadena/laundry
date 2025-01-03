import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent extends HelperPage implements OnInit {
  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onTabChange(index: number) {
    console.log('Change tab:', index);
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
