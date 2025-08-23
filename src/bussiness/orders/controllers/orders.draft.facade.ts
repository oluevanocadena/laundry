import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { OrdersApiService } from '@bussiness/orders/orders.api.service';

import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { ProductsApiService } from '@bussiness/products/products.api.service';
import { Product } from '@bussiness/products/products.interfaces';

import {
  OrdersCartDomain,
  OrderTotals,
} from '@bussiness/orders/domains/orders.cart.domain';
import {
  Delivery,
  Order,
  OrderItem,
} from '@bussiness/orders/orders.interfaces';

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
  orderTotals = new SubjectProp<OrderTotals>(null);

  orderCustomer = new SubjectProp<Customer>(null);
  orderDelivery = new SubjectProp<Delivery>(null);

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
