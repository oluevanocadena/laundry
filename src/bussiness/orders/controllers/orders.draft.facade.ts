import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TuiDay, TuiTimeLike } from '@taiga-ui/cdk';
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
  PaymentMethods,
} from '@bussiness/orders/orders.interfaces';
import { StorageProp } from '@type/storage.type';
import { OrderEmpty } from '../../../globals/constants/orders.constants';
import { OrdersDomain } from '../domains/orders.domain';
import { TuiTimeDomain } from '../../../globals/domains/tui-time.domain';

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
  showCancelOrderModal: boolean = false;

  order = new SubjectProp<Order>(OrderEmpty);

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
  notes = new FormProp<string>(this.formGroup, 'notes', '');
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
      this.fillOrderItems();
    } else {
      this.clearState();
    }
  }

  bindEvents() {
    this.orderItems.onChange((items) => {
      this.calcTotals();
    });
  }

  clearState() {
    this.selectedOrder.value = null;
    this.order.value = OrderEmpty;
    this.orderDelivery.value = null;
    this.orderCustomer.value = null;
    this.orderItems.value = [];
    this.orderTotals.value = null;
    this.formDelivery.reset();
    this.formGroup.reset();
    this.edition = false;
  }

  submitForm() {
    const order: Order = OrdersDomain.buildOrder(
      this.order.value!,
      this.orderCustomer.value!,
      this.orderItems.value!,
      this.orderTotals.value!,
      this.orderDelivery.value!,
      this.discountType.value!,
      this.notes.value!,
      this.sessionService
    );

    const orderItems: OrderItem[] = OrdersDomain.buildOrderItems(
      this.orderItems.value ?? []
    );

    this.api.updateOrder(order, orderItems).then((order) => {
      if (order) {
        if (this.edition === false) {
          this.router.navigate([routes.Orders]);
        } else {
          this.selectedOrder.value = order;
          this.fillOrderItems();
          this.nzMessageService.success('Pedido guardado correctamente');
        }
      }
    });
  }

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

  fillOrderItems() {
    const order = this.order.value;
    this.orderItems.value = order?.OrderItems ?? [];
    this.orderTotals.value = {
      Discount: order?.Discount ?? 0,
      Taxes: order?.Taxes ?? 0,
      Subtotal: order?.Subtotal ?? 0,
      Total: order?.Total ?? 0,
      Delivery: order?.DeliveryCost ?? 0,
      DiscountRate: order?.DiscountRate ?? 0,
    };
    this.orderCustomer.value = order?.Customer ?? null;
    this.formGroup.reset({
      discount: order?.Discount ?? 0,
      discountType: order?.DiscountType ?? DiscountTypesEnum.Amount,
      notes: order?.Notes ?? '',
    });
    this.deliveryCost.value = order?.DeliveryCost ?? 0;
    this.deliveryType.value = order?.DeliveryType ?? DeliveryTypesEnum.Pickup;
    this.orderDelivery.value = {
      DeliveryType: order?.DeliveryType ?? DeliveryTypesEnum.Pickup,
      Date: order?.DeliveryDate
        ? (TuiDay.fromLocalNativeDate(
            moment(order.DeliveryDate).toDate()
          ) as unknown as Date)
        : undefined,
      Time: order?.DeliveryTime ?? undefined,
      Cost: order?.DeliveryCost ?? 0,
      Indications: order?.DeliveryIndications ?? '',
      Address: order?.DeliveryAddress ?? '',
    };
  }

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
    this.orderDelivery.value = {
      DeliveryType: delivery.deliveryType as DeliveryTypes,
      Date: TuiTimeDomain.castTuiDay(delivery.deliveryDate as TuiDay),
      Time: TuiTimeDomain.castTuiTime(delivery.deliveryTime as TuiTimeLike),
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
        Date: undefined,
        Time: undefined,
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
    this.order.value!.Paid =
      paymentMethod === PaymentMethodsEnum.None ? false : true;
    this.order.value!.PaymentMethod = paymentMethod as PaymentMethods;
    this.order.value!.PaymentCardTransactionNumber = transactionNumber;
    this.order.value!.PaymentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.submitForm();
  }

  onRefund() {
    this.showRefundModal = false;
    this.order.value!.Paid = false;
    this.order.value!.PaymentMethod = undefined;
    this.order.value!.PaymentCardTransactionNumber = undefined;
    this.order.value!.PaymentDate = undefined;
    this.submitForm();
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

  onCancelOrder() {
    this.order.value!.StatusId = OrderStatusEnum.Cancelled;
    this.submitForm();
    this.showCancelOrderModal = false;
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

  openCancelOrderModal() {
    this.showCancelOrderModal = true;
  }

  /**
   * Getters
   */

  get canExit(): boolean {
    const result = this.order.value?.StatusId !== OrderStatusEnum.Draft;
    return result;
  }
}
