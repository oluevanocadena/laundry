import {
  DeliveryTypesEnum,
  OrderStatusEnum,
} from '@bussiness/orders/orders.enums';
import { Order } from '@bussiness/orders/orders.interfaces';

export const OrderEmpty: Order = {
  CustomerId: undefined,
  Deleted: false,
  DeliveryAddress: '',
  DeliveryCost: 0,
  DeliveryDate: null,
  DeliveryIndications: '',
  DeliveryTime: null,
  DeliveryType: DeliveryTypesEnum.Pickup,
  Discount: 0,
  DiscountRate: 0,
  ItemCount: 0,
  OrderItems: [],
  Paid: false,
  PaymentCardTransactionNumber: undefined,
  PaymentDate: undefined,
  PaymentMethod: undefined,
  StatusId: OrderStatusEnum.Draft,
  Subtotal: 0,
  Taxes: 0,
  Total: 0,
};
