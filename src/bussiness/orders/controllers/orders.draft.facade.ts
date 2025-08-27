import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TuiDay } from '@taiga-ui/cdk';
import { FormProp } from '@type/form.type';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';
import { SubjectProp } from '@type/subject.type';

import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { OrdersApiService } from '@bussiness/orders/orders.api.service';

import { OrdersCartDomain } from '@bussiness/orders/domains/orders.cart.domain';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { ProductsApiService } from '@bussiness/products/products.api.service';
import { Product } from '@bussiness/products/products.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import {
  DeliveryTypesEnum,
  DiscountTypesEnum,
  OrderItemStatusEnum,
  OrderStatusEnum,
  PaymentMethodsEnum,
} from '@bussiness/orders/orders.enums';
import {
  Delivery,
  DeliveryTypes,
  DiscountTypes,
  Order,
  OrderItem,
  OrderTotals,
} from '@bussiness/orders/orders.interfaces';
import { StorageProp } from '@type/storage.type';

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
    Discount: 0,
    Taxes: 0,
    Subtotal: 0,
    Total: 0,
    ItemCount: 0,
    CustomerId: undefined,
    OrderItems: [],
    Deleted: false,
    DiscountRate: 0,
    DeliveryType: DeliveryTypesEnum.Pickup,
    DeliveryDate: null,
    DeliveryTime: null,
    DeliveryCost: 0,
    DeliveryAddress: '',
    DeliveryIndications: '',
    Paid: false,
    PaymentMethod: undefined,
    PaymentDate: undefined,
    PaymentCardTransactionNumber: undefined,
  });

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
    deliveryCost: new FormControl(0, [Validators.required]),
    deliveryDate: new FormControl(tuiToday, Validators.required),
    deliveryTime: new FormControl<string | null>(null, Validators.required),
    deliveryInstructions: new FormControl(''),
  });

  discount = new FormProp<number>(this.formGroup, 'discount', 0);
  discountType = new FormProp<DiscountTypes>(
    this.formGroup,
    'discountType',
    'amount'
  );

  deliveryCost = new FormProp<number>(this.formDelivery, 'deliveryCost', 0);
  deliveryType = new FormProp<DeliveryTypes>(
    this.formDelivery,
    'deliveryType',
    'pickup'
  );

  selectedOrder = new StorageProp<Order>(null, 'EDITION_SELECTED_ORDER');

  constructor(
    public api: OrdersApiService,
    public apiCustomers: CustomersApiService,
    public apiProducts: ProductsApiService,
    public facadeProducts: ProductsDraftFacade,
    public nzMessageService: NzMessageService,
    public router: Router,
    public sessionService: SessionService
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    if (this.selectedOrder.value) {
      this.order.value = this.selectedOrder.value;
      this.edition = true;
    }
  }

  bindEvents() {
    this.orderItems.onChange((items) => {
      this.calcTotals();
    });
  }

  clearState() {
    this.selectedOrder.value = null;
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

  saveOrder() {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const orderValue = this.order.value!;
    const currentLocationId =
      this.sessionService.SessionInfo.value?.Location.id;
    const organizationId = this.sessionService.organizationId;
    const order: Order = {
      id: orderValue.id ?? undefined,
      createdAt: orderValue.createdAt ?? now,
      updatedAt: now,
      CustomerId: this.orderCustomer.value?.id ?? '',

      DiscountType: this.discountType.value ?? DiscountTypesEnum.Amount,
      DiscountRate: this.discount.value ?? 0,
      Discount: this.orderTotals.value?.Discount ?? 0,

      ItemCount: this.orderItems.value?.length ?? 0,
      Taxes: this.orderTotals.value?.Taxes ?? 0,
      Subtotal: this.orderTotals.value?.Subtotal ?? 0,
      Total: this.orderTotals.value?.Total ?? 0,

      Paid: orderValue.Paid ?? false,
      PaymentMethod: orderValue.PaymentMethod ?? PaymentMethodsEnum.Cash,
      PaymentDate: orderValue.PaymentDate ?? undefined,
      PaymentCardTransactionNumber:
        orderValue.PaymentCardTransactionNumber ?? undefined,

      DeliveryType:
        this.orderDelivery.value?.DeliveryType ?? DeliveryTypesEnum.Pickup,
      DeliveryDate:
        this.orderDelivery.value?.Date ??
        this.order.value?.DeliveryDate ??
        null,
      DeliveryTime:
        this.orderDelivery.value?.Time ??
        this.order.value?.DeliveryTime ??
        null,
      DeliveryCost:
        this.orderDelivery.value?.Cost ?? this.order.value?.DeliveryCost ?? 0,
      DeliveryAddress:
        this.orderDelivery.value?.Address ??
        this.order.value?.DeliveryAddress ??
        '',
      DeliveryIndications:
        this.orderDelivery.value?.Indications ??
        this.order.value?.DeliveryIndications ??
        '',

      Notes: orderValue.Notes ?? this.formGroup.value.notes ?? '',
      StatusId: orderValue.StatusId ?? OrderStatusEnum.Pending,

      OrganizationId: orderValue.OrganizationId ?? organizationId,
      LocationId: orderValue.LocationId ?? currentLocationId,

      Deleted: orderValue.Deleted ?? false,
    };

    const orderItems: OrderItem[] =
      this.orderItems.value?.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        Name: item.Name,
        Description: item.Description,
        ImageUrl: item.ImageUrl,
        Quantity: item.Quantity,
        UnitMeasureId: item.UnitMeasureId,
        Price: item.Price,
        Total: item.Total,
        ItemStatusId: item.ItemStatusId ?? OrderItemStatusEnum.NotProccesed,
        ProductId: item.ProductId,
        Deleted: item.Deleted ?? false,
      })) ?? [];
    this.api.updateOrder(order, orderItems).then((order) => {
      if (order) {
        this.order.value!.id = order.id;
        this.nzMessageService.success('Pedido guardado correctamente');
        this.router.navigate([routes.Orders]);
      }
    });
  }

  /**
   * Methods
   */

  calcTotals() {
    this.orderTotals.value = OrdersCartDomain.calculateTotals(
      this.orderItems.value ?? [],
      this.discount.value ?? 0,
      this.deliveryCost.value ?? 0
    );
  }

  /**
   * Ui Events
   */

  onSelectDelivery() {
    const delivery = this.formDelivery.value;
    const date = delivery.deliveryDate;
    const formattedDate =
      typeof date === 'string' && date
        ? moment(date).format('YYYY-MM-DD')
        : moment(date?.toLocalNativeDate()).format('YYYY-MM-DD') ?? null;
    this.orderDelivery.value = {
      DeliveryType: delivery.deliveryType as DeliveryTypes,
      Date: formattedDate,
      Time: delivery.deliveryTime ?? null,
      Cost: delivery.deliveryCost ?? 0,
      Indications: delivery.deliveryInstructions ?? '',
      Address: this.orderCustomer.value?.Address ?? '',
    };
    this.calcTotals();
    this.formDelivery.reset();
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
    this.saveOrder();
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
    this.calcTotals();
    this.showAdjustDiscountModal = false;
  }

  onRemoveDiscount() {
    this.order.value!.Discount = 0;
    this.calcTotals();
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

  openCustomerModal() {
    this.showCustomerModal = true;
  }

  /**
   * Getters
   */

  get canExit(): boolean {
    const result =
      !(
        (this.order.value?.ItemCount ?? 0) > 0 ||
        this.orderCustomer.value !== null
      ) || this.order.value!.id === undefined;
    console.log('canExit', result);
    return result;
  }
}
