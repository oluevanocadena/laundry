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
  DeliveryTypesEnum,
  DiscountTypesEnum,
  OrderStatusEnum,
  PaymentMethodsEnum,
  PaymentStatusEnum,
} from '../orders.enums';

import { OrdersCartDomain } from '@bussiness/orders/domains/orders.cart.domain';
import {
  Delivery,
  DeliveryTypes,
  DiscountTypes,
  Order,
  OrderItem,
  OrderTotals,
} from '@bussiness/orders/orders.interfaces';
import moment from 'moment';
import { FormProp } from '@type/form.type';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';

const timeItems = tuiCreateTimePeriods(8, 20, [0, 30, 59]);
const tuiToday = TuiDay.fromLocalNativeDate(moment().add(1, 'day').toDate());

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
  showCustomerCreateModal: boolean = false;
  showAdjustDelivery: boolean = false;

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

  timeItems = timeItems;
  orderItemSelected = new SubjectProp<OrderItem>(null);
  orderItems = new SubjectProp<OrderItem[]>([]);
  orderTotals = new SubjectProp<OrderTotals>(null);

  orderCustomer = new SubjectProp<Customer>(null);
  orderDelivery = new SubjectProp<Delivery>(null);

  formGroup = new FormGroup({
    notes: new FormControl(''),
    discountType: new FormControl<DiscountTypes>('amount'),
    discount: new FormControl(0, [Validators.required]),
  });

  formDelivery = new FormGroup({
    deliveryType: new FormControl('', [Validators.required]),
    deliveryInstructions: new FormControl(''),
    deliveryCost: new FormControl(0, [Validators.required]),
    deliveryDate: new FormControl(tuiToday, Validators.required),
    deliveryTime: new FormControl(this.timeItems[0], Validators.required),
  });

  discount = new FormProp<number>(this.formGroup, 'discount', 0);
  deliveryCost = new FormProp<number>(this.formGroup, 'deliveryCost', 0);
  deliveryType = new FormProp<DeliveryTypes>(
    this.formGroup,
    'deliveryType',
    'pickup'
  );
  discountType = new FormProp<DiscountTypes>(
    this.formGroup,
    'discountType',
    'amount'
  );

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

  onSelectDelivery() {
    const delivery = this.formDelivery.value;
    this.orderDelivery.value = {
      DeliveryType: delivery.deliveryType as DeliveryTypes,
      Date:
        moment(delivery.deliveryDate?.toLocalNativeDate()).format(
          'YYYY-MM-DD'
        ) ?? null,
      Time: delivery.deliveryTime?.toString() ?? null,
      Cost: delivery.deliveryCost ?? 0,
      Indications: delivery.deliveryInstructions ?? undefined,
      Address: this.orderCustomer.value?.Address ?? '',
    };
    this.showAdjustDelivery = false;
  }

  onSelectProduct(product: Product, quantity: number) {
    this.orderItems.value = OrdersCartDomain.addProductItem(
      this.orderItems.value ?? [],
      product,
      quantity
    );

    this.order.value!.ItemCount = this.orderItems.value?.length ?? 0;
    this.showSearchProduct = false;
  }

  onSelectCustomer(customer: Customer | null) {
    if (customer !== null) {
      this.orderCustomer.value = customer;
      this.showCustomerModal = false;
      this.orderDelivery.value = {
        Address: customer.Address || '',
        Date: null,
        Time: null,
        Cost: 0,
        DeliveryType: DeliveryTypesEnum.Pickup,
      };
    }
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

  onRefund() {
    this.showRefundModal = false;
    this.order.value!.Paid = false;
    this.order.value!.PaymentMethod = undefined;
    this.order.value!.PaymentCardTransactionNumber = undefined;
    this.order.value!.PaymentDate = undefined;
  }

  onApplyDiscount() {
    this.order.value!.Discount = OrdersCartDomain.calculateDiscount(
      this.orderTotals.value ?? {
        Total: 0,
        Subtotal: 0,
        Taxes: 0,
        Delivery: 0,
        Discount: 0,
      },
      this.discount.value ?? 0,
      this.discountType.value ?? DiscountTypesEnum.Amount
    );
    this.orderTotals.value = OrdersCartDomain.calculateTotals(
      this.orderItems.value ?? [],
      this.order.value!.Discount
    );
    this.showAdjustDiscountModal = false;
  }

  onRemoveDiscount() {
    this.order.value!.Discount = 0;
    this.orderTotals.value = OrdersCartDomain.calculateTotals(
      this.orderItems.value ?? [],
      this.order.value!.Discount ?? 0 //ya es cero por que se le asigno cero 2 lineas arriba
    );
    this.showAdjustDiscountModal = false;
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

  openRefund() {
    this.showRefundModal = true;
  }

  openCreateCustomerModal() {
    this.showCustomerCreateModal = true;
  }

  openAdjustDelivery() {
    this.showAdjustDelivery = true;
  }

  /**
   * Getters
   */

  get canExit(): boolean {
    const result = !(
      (this.order.value?.ItemCount ?? 0) > 0 ||
      this.orderCustomer.value !== null
    );
    console.log('canExit', result);
    return result;
  }
}
