import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDay, TuiTimeLike } from '@taiga-ui/cdk';
import { NzMessageService } from 'ng-zorro-antd/message';

import moment from 'moment';

import { routes } from '@app/routes';
import { OrderEmpty } from '@bussiness/orders/constants/orders.constants';
import { TuiTimeDomain } from '@globals/domains/tui-time.domain';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';

import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
import { DiscountTypesEnum } from '@bussiness/orders/enums/order.discount.enums';
import { PaymentMethodsEnum, PaymentStatusIdEnum, PaymentStatusNameEnum } from '@bussiness/orders/enums/order.payment.enums';
import { OrderItemStatusEnum, OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';

import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { OrdersCartDomain } from '@bussiness/orders/domains/orders.cart.domain';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { Delivery, Order, OrderTotals } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { DeliveryTypes, DiscountTypes } from '@bussiness/orders/types/orders.types';
import { PaymentMethods } from '@bussiness/orders/types/payments.type';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { Product } from '@bussiness/products/interfaces/products.interfaces';
import { ProductsApiService } from '@bussiness/products/services/products.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { OrdersPaymentDomain } from '../domains/orders.payment.domain';

const tuiToday = TuiDay.fromLocalNativeDate(moment().add(1, 'day').toDate());

@Injectable({
  providedIn: 'root',
})
export class OrdersDraftFacade extends FacadeBase {
  //Flag Management
  edition: boolean = false;
  showAdjustDelivery: boolean = false;
  showAdjustDiscountModal: boolean = false;
  showAdjustQuantity: boolean = false;
  showCancelOrderModal: boolean = false;
  showCollectPaymentModal: boolean = false;
  showConfirmDelete: boolean = false;
  showCustomerCreateModal: boolean = false;
  showCustomerModal: boolean = false;
  showDeleteModal: boolean = false;
  showItemsProcessing: boolean = false;
  showRefundModal: boolean = false;
  showSearchProduct: boolean = false;

  order = new SubjectProp<Order>(UtilsDomain.clone(OrderEmpty));

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
  discountType = new FormProp<DiscountTypes>(this.formGroup, 'discountType', 'amount');

  deliveryCost = new FormProp<number>(this.formDelivery, 'deliveryCost', 0);
  deliveryType = new FormProp<DeliveryTypes>(this.formDelivery, 'deliveryType', 'showroom');

  selectedOrder = new StorageProp<Order>(null, 'EDITION_SELECTED_ORDER');

  constructor(
    public api: OrdersApiService,
    public apiCustomers: CustomersApiService,
    public apiProducts: ProductsApiService,
    public facadeProducts: ProductsDraftFacade,
    public nzMessageService: NzMessageService,
    public router: Router,
    public sessionService: SessionService,
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
    this.order.value = UtilsDomain.clone(OrderEmpty);
    this.orderCustomer.value = null;
    this.orderDelivery.value = null;
    this.orderItems.value = [];
    this.orderTotals.value = null;
    this.selectedOrder.value = null;
    this.formDelivery.reset();
    this.formGroup.reset();
    this.edition = false;
    this.showAdjustDelivery = false;
    this.showAdjustDiscountModal = false;
    this.showAdjustQuantity = false;
    this.showCancelOrderModal = false;
    this.showCollectPaymentModal = false;
    this.showConfirmDelete = false;
    this.showCustomerCreateModal = false;
    this.showCustomerModal = false;
    this.showItemsProcessing = false;
    this.showRefundModal = false;
    this.showSearchProduct = false;
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
      this.sessionService,
    );

    const orderItems: OrderItem[] = OrdersDomain.buildOrderItems(this.orderItems.value ?? []);

    this.api.updateOrder(order, orderItems).then((response) => {
      if (response.success === false) {
        this.nzMessageService.error('Ocurrió un error al guardar el pedido, intente nuevamente.');
      } else {
        if (this.order.value?.StatusId === OrderStatusEnum.Draft) {
          this.router.navigate([routes.Orders]);
          return;
        } else {
          this.selectedOrder.value = response.data as unknown as Order;
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
    this.apiProducts.getProducts(search, 1, 5, this.sessionService.locationId);
  }

  updateOrderItemStatus(status: OrderItemStatusEnum) {
    const errorMessage = 'Ocurrió un error al actualizar el estado del pedido, intente nuevamente.';
    const orderItemToSave = this.orderItemSelected.value;
    if (orderItemToSave && orderItemToSave.id) {
      //Update single item
      this.api.updateOrderItemStatus(orderItemToSave.id, status).then((response) => {
        if (response.success) {
          const orderItemUpdated = response.data as unknown as OrderItem;
          this.orderItems.value =
            this.orderItems.value?.map((item) => (item.id === orderItemUpdated.id ? orderItemUpdated : item)) ?? [];
          this.api.getOrder(this.order.value?.id ?? '').then((rspOrder) => {
            if (rspOrder.success) {
              this.order.value = rspOrder.data as unknown as Order;
              this.selectedOrder.value = rspOrder.data as unknown as Order;
            } else {
              this.nzMessageService.error(errorMessage);
            }
          });
        } else {
          this.nzMessageService.error(errorMessage);
        }
      });
    } else {
      //Update all items
      this.api.updateAllOrderItemsStatus(this.order.value?.id ?? '', status).then((response) => {
        if (response.success) {
          this.order.value = response.data as unknown as Order;
          this.orderItems.value = response.data?.OrderItems ?? [];
          this.selectedOrder.value = response.data as unknown as Order;
        }
      });
    }
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
    this.orderDelivery.value = {
      DeliveryType: order?.DeliveryType ?? DeliveryTypesEnum.Showroom,
      Date: order?.DeliveryDate
        ? (TuiDay.fromLocalNativeDate(moment(order.DeliveryDate).toDate()) as unknown as Date)
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
      this.deliveryCost.value ?? 0,
    );
    if (this.order.value) {
      this.order.value.Total = this.orderTotals.value?.Total ?? 0;
      this.order.value.Subtotal = this.orderTotals.value?.Subtotal ?? 0;
      this.order.value.Taxes = this.orderTotals.value?.Taxes ?? 0;
      this.order.value.DeliveryCost = this.orderTotals.value?.Delivery ?? 0;
      this.order.value.Discount = this.orderTotals.value?.Discount ?? 0;
      this.order.value.DiscountRate = this.orderTotals.value?.DiscountRate ?? 0;
      this.order.value.ItemCount = this.orderItems.value?.length ?? 0;
    }
  }

  /**
   * Ui Events
   */

  onSelectDelivery() {
    const delivery = this.formDelivery.value;
    this.orderDelivery.value = {
      DeliveryType: delivery.deliveryType as DeliveryTypes,
      Date: TuiTimeDomain.castTuiDay(delivery.deliveryDate as TuiDay),
      Time: TuiTimeDomain.castTuiTime(delivery.deliveryTime as TuiTimeLike),
      Cost: delivery.deliveryCost ?? 0,
      Indications: delivery.deliveryInstructions ?? '',
      Address: this.orderCustomer.value?.Address ?? '',
    };
    this.order.value!.DeliveryType = delivery.deliveryType as DeliveryTypes;
    this.calcTotals();
    this.formDelivery.reset();
    this.showAdjustDelivery = false;
  }

  onSelectProduct(product: Product, quantity: number) {
    this.orderItems.value = OrdersCartDomain.addProductItem(this.orderItems.value ?? [], product, quantity);

    this.order.value!.ItemCount = this.orderItems.value?.length ?? 0;
    this.showSearchProduct = false;
  }

  onSelectCustomer(customer: Customer | null) {
    if (customer !== null) {
      this.orderCustomer.value = customer;
      this.order.value!.CustomerId = customer.id;
      this.showCustomerModal = false;
      this.orderDelivery.value = {
        Address: customer.Address || '',
        Date: undefined,
        Time: undefined,
        Cost: 0,
        DeliveryType: DeliveryTypesEnum.Showroom,
      };
    }
  }

  onAdjustQuantity(quantity: number) {
    const selected = this.orderItemSelected.value;
    if (!selected) return;

    this.orderItems.value = OrdersCartDomain.adjustProductItemQuantity(
      this.orderItems.value ?? [],
      this.orderItemSelected.value!,
      quantity,
    );
    this.orderItemSelected.value = null;
    this.showAdjustQuantity = false;
  }

  onDeleteItem() {
    if (this.orderItemSelected.value) {
      this.orderItems.value = OrdersCartDomain.removeProductItem(this.orderItems.value ?? [], this.orderItemSelected.value);
      this.orderItemSelected.value = null;
      this.showAdjustQuantity = false;
    }
  }

  onCollectPayment(paymentMethod: PaymentMethodsEnum, transactionNumber?: string) {
    this.showCollectPaymentModal = false;
    this.order.value!.PaymentStatusId = OrdersPaymentDomain.getPaymentStatusByMethod(paymentMethod);
    this.order.value!.PaymentStatus = OrdersPaymentDomain.getPaymentStatusNameByMethod(this.order.value!.PaymentStatusId);
    this.order.value!.PaymentMethod = paymentMethod as PaymentMethods;
    this.order.value!.PaymentCardTransactionNumber = transactionNumber;
    this.order.value!.PaymentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.submitForm();
  }

  onRefund() {
    this.showRefundModal = false;
    this.order.value!.PaymentStatusId = PaymentStatusIdEnum.Refunded;
    this.order.value!.PaymentStatus = OrdersPaymentDomain.getPaymentStatusNameByMethod(this.order.value!.PaymentStatusId);
    this.order.value!.PaymentMethod = undefined;
    this.order.value!.PaymentCardTransactionNumber = undefined;
    this.order.value!.PaymentDate = undefined;
    this.submitForm();
  }

  onApplyDiscount() {
    this.order.value!.Discount = OrdersCartDomain.calculateDiscount(
      this.orderTotals.value,
      this.discount.value ?? 0,
      this.discountType.value ?? DiscountTypesEnum.Amount,
    );
    this.calcTotals();
    this.showAdjustDiscountModal = false;
  }

  onRemoveDiscount() {
    this.order.value!.Discount = 0;
    this.discount.value = 0;
    this.calcTotals();
    this.showAdjustDiscountModal = false;
  }

  onCancelOrder() {
    if (this.order.value?.id) {
      try {
        this.api.updateOrderStatus(this.order.value?.id, OrderStatusEnum.Cancelled).then((orderSaved) => {
          if (orderSaved) {
            this.showCancelOrderModal = false;
            this.router.navigate([routes.Orders]);
          }
        });
      } catch (error) {
        this.nzMessageService.error(error as string);
      }
    }
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
    const result = this.order.value?.StatusId === OrderStatusEnum.Draft;
    return result;
  }
}
