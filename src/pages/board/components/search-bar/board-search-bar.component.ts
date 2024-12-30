import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'board-search-bar',
  standalone: false,
  templateUrl: './board-search-bar.component.html',
  styleUrls: ['./board-search-bar.component.scss'],
})
export class BoardSearchBarComponent extends HelperPage {
  //Flag Management
  protected customerOptionControl = false;
  protected deliveryOptionControl = false;

  //Arrays
  orderTypes = ['OnTime', 'Pending', 'Completed', 'Cancelled'];
  deliveryTypes = ['Delivery', 'Pickup'];

  //Models
  orderType = [];
  deliveryType = [];

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(''),
  });

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  /**
   * Life Cycle Hook
   */
  ngOnInit() {}
}
