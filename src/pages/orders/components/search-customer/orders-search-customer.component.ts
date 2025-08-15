import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, finalize } from 'rxjs';
import { HelperTablePage } from '../../../../components/common/helper.table.page';
import { Customer } from '../../../../bussiness/customers/customers.interfaces';
import { CustomersApiService } from '../../../../bussiness/customers/customers.api.service';
import { OrdersDraftFacade } from '../../../../bussiness/orders/controllers/orders.draft.facade';
import { FormProp } from '../../../../types/form.type';

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
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      this.facade.getCustomers('');
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange = new EventEmitter<boolean>();

  @Output() onConfirm = new EventEmitter<Customer | null>();

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(''),
  });
  search = new FormProp(this.formGroup, 'search', '');

  customer: Customer | null = null;

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */
  selectCustomer(customer: Customer) {
    this.customer = customer;
  }

  confirm() {
    this.onConfirm.emit(this.customer);
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

  get busy(): boolean {
    return this.facade.apiCustomers.busy.value;
  }

  get customers(): Customer[] {
    return this.facade.apiCustomers.customers.value ?? [];
  }

  get canSave(): boolean {
    return this.customer !== null;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.search.onChange((value) => {
      if (value) {
        this.customer = null;
      }
    });
  }
}
