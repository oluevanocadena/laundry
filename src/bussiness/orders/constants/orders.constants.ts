import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
import { OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import { UIDefaultTableFilter } from '../../../globals/constants/supabase-tables.constants';
import { PaymentStatusIdEnum } from '../types/payments.type';

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
  PaymentStatusId: PaymentStatusIdEnum.Pending,
  PaymentCardTransactionNumber: undefined,
  PaymentDate: undefined,
  PaymentMethod: undefined,
  StatusId: OrderStatusEnum.Draft,
  Subtotal: 0,
  Taxes: 0,
  Total: 0,
};

export const OrderDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'createdAt',
};
