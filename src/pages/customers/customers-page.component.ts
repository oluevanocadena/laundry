import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../components/common/helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';
import {
  TableOptionItemSelectEvent,
  TableOptionsItem,
} from '../../components/common/table-options/table-options.component';
import { SearchModalEvent } from '../../components/common/modal-search/modal-search.component';
import {
  TableSegmentsItem,
  TableSegmentsItemEvent,
} from '../../components/common/table-segments/table-segments.component';
import {
  Customer,
  CustomersService,
} from '../../services/customers.service';
import { OrderStatusEnum } from '../../services/order-status.service';
import { finalize } from 'rxjs';
import { CustomerStatusEnum } from '../../services/customers-status.service';

@Component({
  selector: 'app-customers-page',
  standalone: false,
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss'],
})
export class CustomersPageComponent extends HelperPage implements OnInit {
  //Flag Management
  showSort: boolean = false;
  showSearch: boolean = false;
  loading: boolean = false;

  //Index
  indexTab: number = 0;

  //Arrays
  options: TableOptionsItem[] = [
    { label: 'Edit', icon: 'pencil', id: 1 },
    { label: 'View', icon: 'arrow-up-right', id: 2 },
    { label: 'Inactive', icon: 'ban', id: 3 },
  ];

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
  optionsSegments: TableSegmentsItem[] = [
    { id: 0, label: 'All' },
    { id: CustomerStatusEnum.Active, label: 'Active' },
    { id: CustomerStatusEnum.Inactive, label: 'Inactive' },
  ];
  customers: Customer[] = [];

  constructor(public customersService: CustomersService) {
    super();
  }

  /**
   * APi Calls
   */
  load() {
    this.loading = true;
    this.customersService
      .getCustomersFake(1, 10, '')
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res) => {
        this.customers = res;
      });
  }

  /**
   * UI Events
   */
  openSearchModal() {
    this.showSearch = true;
  }

  openSortModal() {
    this.showSort = true;
  }

  onSearch(value: SearchModalEvent) {
    console.log('value', value);
  }

  onSort(value: string) {
    console.log('value', value);
  }

  onSegmentChange(event: TableSegmentsItemEvent) {
    console.log('event', event);
  }

  onSelectOption(event: TableOptionItemSelectEvent) {
    console.log('event', event);
  }

  export() {
    console.log('Export');
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

  /**
   * Getters
   */

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.load();
  }
}
