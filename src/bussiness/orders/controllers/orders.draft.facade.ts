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
  OrderStatusEnum,
  PaymentMethodsEnum,
  PaymentStatusEnum,
} from '../orders.enums';

import { OrdersCartDomain } from '@bussiness/orders/domains/orders.cart.domain';
import {
  Delivery,
  Order,
  OrderItem,
  OrderTotals,
} from '@bussiness/orders/orders.interfaces';
import moment from 'moment';

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
  showConfirmDelete: boolean = false;
  showAdjustDiscountModal: boolean = false;
  showCollectPaymentModal: boolean = false;

  order = new SubjectProp<Order>({
    StatusId: OrderStatusEnum.Draft,
    Paid: false,
    PaymentMethod: undefined,
    PaymentDate: undefined,
    PaymentCardTransactionNumber: undefined,
    Discount: 0,
    Taxes: 0,
    Subtotal: 0,
    Total: 0,
    ItemCount: 0,
    CustomerId: 0,
    OrderItems: [],
    Deleted: false,
  });

  orderItemSelected = new SubjectProp<OrderItem>(null);
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

  bindEvents() {
    this.orderItems.onChange((items) => {
      console.log('items', items);
      this.orderTotals.value = OrdersCartDomain.calculateTotals(
        this.orderItems.value ?? [],
        this.formGroup.value.discount ?? 0
      );
    });
  }

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
   * Methods
   */

  /**
   * Ui Events
   */
  onSelectProduct(product: Product, quantity: number) {
    this.orderItems.value = OrdersCartDomain.addProductItem(
      this.orderItems.value ?? [],
      product,
      quantity
    );

    this.order.value!.ItemCount = this.orderItems.value?.length ?? 0;
    this.showSearchProduct = false;
  }

  onAdjustQuantity(quantity: number) {
    const selected = this.orderItemSelected.value;
    if (!selected) return;

    this.orderItems.value = OrdersCartDomain.adjustProductItemQuantity(
      this.orderItems.value ?? [],
      this.orderItemSelected.value!,
      quantity
    );
    this.orderItemSelected.value = null;
    this.showAdjustQuantity = false;
  }

  onDeleteItem() {
    if (this.orderItemSelected.value) {
      this.orderItems.value = OrdersCartDomain.removeProductItem(
        this.orderItems.value ?? [],
        this.orderItemSelected.value
      );
      this.orderItemSelected.value = null;
      this.showAdjustQuantity = false;
    }
  }

  onCollectPayment(
    paymentMethod: PaymentMethodsEnum,
    transactionNumber?: string
  ) {
    this.showCollectPaymentModal = false;
    this.order.value!.Paid = true;
    this.order.value!.PaymentMethod = paymentMethod;
    this.order.value!.PaymentCardTransactionNumber = transactionNumber;
    this.order.value!.PaymentDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  goToProducts() {
    this.facadeProducts.product.value = null;
    window.open(routes.ProductDraft, '_blank');
  }

  openConfirmDelete(item: OrderItem) {
    this.orderItemSelected.value = item;
    this.showConfirmDelete = true;
  }

  openAdjustQuantity(item: OrderItem) {
    this.orderItemSelected.value = item;
    this.showAdjustQuantity = true;
  }

  openCollectPayment() {
    this.showCollectPaymentModal = true;
  }

  openDiscount() {
    this.showAdjustDiscountModal = true;
  }
}
