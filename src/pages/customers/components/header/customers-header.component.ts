import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import {
  Customer,
  CustomerEmpty,
  CustomersService,
} from '../../../../services/customers.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';

@Component({
  selector: 'customers-header',
  standalone: false,
  templateUrl: './customers-header.component.html',
  styleUrls: ['./customers-header.component.scss'],
})
export class CustomersHeaderComponent extends HelperPage implements OnInit {
  //Flag Management
  busy: boolean = false;
  showMoreOptions: boolean = false;

  //Input
  @Input() loading: boolean = false;
  @Input() edition: boolean = false;

  //Input
  private _order: Customer | null = null;
  @Input() set customer(value: Customer) {
    this._order = value;
  }
  get customer(): Customer | null {
    return this._order;
  }
  @Output() customerChange: EventEmitter<Customer> =
    new EventEmitter<Customer>();

  //Array
  actionTypes = [
    {
      id: 2,
      name: 'Edit',
    },
    {
      id: 1,
      name: 'Inactive',
    },
    {
      id: 3,
      name: 'Delete',
    },
  ];

  constructor(
    public customersService: CustomersService,
    public nzMessageService: NzMessageService,
    public router: Router
  ) {
    super();
  }

  /**
   * UI Events
   */

  saveCustomer() {
    if (this.customer !== null) {
      console.log('Save Customer:', this.customer);
      this.busy = true;
      this.customersService
        .createFakeCustomer(this.customer)
        .pipe(
          finalize(() => {
            this.busy = false;
          })
        )
        .subscribe((response) => {
          if (response) {
            this.customer = CustomerEmpty;
            this.nzMessageService.success('Customer saved successfully');
            this.router.navigate([this.routes.Customers]);
          } else {
            this.nzMessageService.error('Error saving the customer.');
          }
        });
    }
  }

  onBack() {
    this.router.navigate([this.routes.Customers]);
  }

  /**
   * Getters
   */

  get canSave(): boolean {
    return this.customer !== null;
  }

  /**
   * Life Cicle
   */
  ngOnInit() {}
}
