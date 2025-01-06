import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../components/common/helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';

@Component({
  selector: 'app-customers-page',
  standalone: false,
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
})
export class CustomersPageComponent extends HelperPage implements OnInit {
  //Flag Management
  protected showFilterOptions: boolean = false;

  //Index
  indexTab: number = 0;

  // Outputs
  @Output() onTabChange: EventEmitter<number> = new EventEmitter<number>();

  //FormGroup
  formGroup = new FormGroup({
    date: new FormControl(
      TuiDay.fromLocalNativeDate(moment().add(1, 'day').toDate())
    ),
    orderType: new FormControl('All'),
  });

  //Arrays
  orderTypes = ['All', 'Unprocessed', 'UnPaid', 'Completed', 'Cancelled'];

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onChangeTab(index: number) {
    this.onTabChange.emit(index);
  }

  onSelectFilter(option: string) {
    this.formGroup.get('orderType')?.setValue(option);
    this.showFilterOptions = false;
  }

  /**
   * Getters
   */
  get orderType() {
    return this.formGroup.get('orderType')?.value ?? '';
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}
