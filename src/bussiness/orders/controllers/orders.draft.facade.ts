import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FacadeBase } from '../../../types/facade.base';
import { StorageProp } from '../../../types/storage.type';
import { SubjectProp } from '../../../types/subject.type';
import { CustomersApiService } from '../../customers/customers.api.service';
import { Customer } from '../../customers/customers.interfaces';
import { OrdersApiService } from '../orders.api.service';
import { Delivery, Order, OrderItem } from '../orders.interfaces';
import { routes } from '../../../app/routes';
import { ProductsDraftFacade } from '../../products/controllers/products.draft.facade';

@Injectable({
  providedIn: 'root',
})
export class OrdersDraftFacade extends FacadeBase {
  edition: boolean = false;
  showCustomerModal: boolean = false;
  showDeleteModal: boolean = false;
  showRefundModal: boolean = false;
  showSearchProduct: boolean = false;
  showAdjustQuantity: boolean = false;

  order = new SubjectProp<Order>(null);
  orderItems = new SubjectProp<OrderItem[]>([]);
  customer = new StorageProp<Customer>(null, 'CUSTOMER_EDITION');
  delivery = new SubjectProp<Delivery>(null);

  formGroup = new FormGroup({
    number: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    deliveryId: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
    items: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
  });

  constructor(
    public api: OrdersApiService,
    public apiCustomers: CustomersApiService,
    public facadeProducts: ProductsDraftFacade,
    public router: Router
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.api.orders.value = [];
  }

  submitForm() {}

  /**
   * APi
   */

  getCustomers(search: string) {
    this.apiCustomers.getCustomers(search, 1, 5);
  }

  /**
   * Ui Events
   */

  goToProducts() {
    this.facadeProducts.product.value = null;
    window.open(routes.ProductDraft, '_blank');
  }
}
