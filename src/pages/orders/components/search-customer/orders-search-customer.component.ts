import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, finalize } from 'rxjs';
import { HelperTablePage } from '../../../../components/common/helper.table.page';
import { Customer } from '../../../../bussiness/customers/customers.interfaces';
import { CustomersApiService } from '../../../../bussiness/customers/customers.api.service';

@Component({
  selector: 'orders-search-customer',
  standalone: false,
  templateUrl: './orders-search-customer.component.html',
  styleUrls: ['./orders-search-customer.component.scss'],
})
export class OrdersSearchCustomerComponent
  extends HelperTablePage<Customer>
  implements OnInit
{
  //Flag Maganement
  loading: boolean = false;

  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectCustomer: EventEmitter<Customer | null> =
    new EventEmitter<Customer | null>();

  //Arrays
  customers: Customer[] = [];

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(''),
    selectedCustomer: new FormControl<Customer | null>(null),
  });

  constructor(
    public customersApi: CustomersApiService,
    public nzMessageService: NzMessageService
  ) {
    super();
  }

  /**
   * API Calls
   */

  searchCustomers() {
    // this.loading = true;
    // this.customersService
    //   .getCustomersFake(this.page, this.pageSize, this.search)
    //   .pipe(
    //     catchError((error) => {
    //       this.nzMessageService.error('Error loading products');
    //       return [];
    //     }),
    //     finalize(() => {
    //       this.loading = false;
    //     })
    //   )
    //   .subscribe((customers) => {
    //     this.formGroup.controls['selectedCustomer'].setValue(null);
    //     this.customers = customers;
    //     console.log('customers', customers);
    //   });
  }

  /**
   * UI Events
   */

  assignCustomer() {
    this.onSelectCustomer.emit(this.selectedCustomer);
    this.reset();
    this.close();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  reset() {
    this.formGroup.reset();
  }

  /**
   * Getters
   */

  get canSave(): boolean {
    return this.selectedCustomer !== null;
  }

  get search(): string {
    return this.formGroup.get('search')?.value ?? '';
  }

  get selectedCustomer(): Customer | null {
    return this.formGroup.get('selectedCustomer')?.value ?? null;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.searchCustomers();
  }
}
