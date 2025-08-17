import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';
import { StorageProp } from '@type/storage.type';
import { SubjectProp } from '@type/subject.type';

import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import {
  OrdersCartDomain,
  OrderTotals,
} from '@bussiness/orders/domains/orders.cart.domain';
import { OrdersApiService } from '@bussiness/orders/orders.api.service';
import {
  Delivery,
  Order,
  OrderItem,
} from '@bussiness/orders/orders.interfaces';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { Product } from '@bussiness/products/products.interfaces';
import { ProductsApiService } from '@bussiness/products/products.api.service';

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

  orderTotals = new SubjectProp<OrderTotals>(null);

  formGroup = new FormGroup({
    number: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    deliveryId: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
    items: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    paymentStatus: new FormControl('', [Validators.required]),
    discount: new FormControl(0, [Validators.required]),
  });

  constructor(
    public api: OrdersApiService,
    public apiCustomers: CustomersApiService,
    public apiProducts: ProductsApiService,
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

  fetchCustomers(search: string) {
    this.apiCustomers.getCustomers(search, 1, 5);
  }

  fetchProducts(search: string) {
    this.apiProducts.getProducts(search, 1, 5);
  }

  /**
   * Ui Events
   */
  onSelectProduct(product: Product) {
    this.orderItems.value = OrdersCartDomain.addProductItem(
      this.orderItems.value ?? [],
      product,
      1
    );
    this.orderTotals.value = OrdersCartDomain.calculateTotals(
      this.orderItems.value ?? [],
      this.formGroup.value.discount ?? 0
    );
    this.showSearchProduct = false;
  }

  goToProducts() {
    this.facadeProducts.product.value = null;
    window.open(routes.ProductDraft, '_blank');
  }
}
