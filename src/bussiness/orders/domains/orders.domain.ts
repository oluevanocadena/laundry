import { Customer } from '@bussiness/customers/customers.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import moment from 'moment';
import {
  DeliveryTypesEnum,
  DiscountTypesEnum,
  OrderItemStatusEnum,
  OrderStatusEnum,
  PaymentMethodsEnum,
} from '../orders.enums';
import {
  Delivery,
  DiscountTypes,
  Order,
  OrderItem,
  OrderTotals,
} from '../orders.interfaces';

export class OrdersDomain {
  //Methods

  static buildOrder(
    order: Order,
    orderCustomer: Customer,
    orderItems: OrderItem[],
    orderTotals: OrderTotals,
    orderDelivery: Delivery,
    discountType: DiscountTypes,
    notes: string,
    sessionService: SessionService
  ) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const currentLocationId = sessionService.SessionInfo.value?.Location.id;
    const organizationId = sessionService.organizationId;

    const orderToSave: Order = {
      id: order.id ?? undefined,
      createdAt: order.createdAt ?? now,
      updatedAt: now,
      CustomerId: orderCustomer.id ?? '',

      DiscountType: discountType ?? DiscountTypesEnum.Amount,
      DiscountRate: order.DiscountRate ?? 0,
      Discount: order.Discount ?? 0,

      ItemCount: orderItems.length ?? 0,
      Taxes: orderTotals.Taxes ?? 0,
      Subtotal: orderTotals.Subtotal ?? 0,
      Total: orderTotals.Total ?? 0,

      Paid: order.Paid ?? false,
      PaymentMethod: order.PaymentMethod ?? PaymentMethodsEnum.Cash,
      PaymentDate: order.PaymentDate ?? undefined,
      PaymentCardTransactionNumber:
        order.PaymentCardTransactionNumber ?? undefined,

      DeliveryType: orderDelivery.DeliveryType ?? DeliveryTypesEnum.Pickup,
      DeliveryDate: orderDelivery.Date ?? order.DeliveryDate ?? null,
      DeliveryTime: orderDelivery.Time ?? order.DeliveryTime ?? null,
      DeliveryCost: orderDelivery.Cost ?? order.DeliveryCost ?? 0,
      DeliveryAddress: orderDelivery.Address ?? order.DeliveryAddress ?? '',
      DeliveryIndications:
        orderDelivery.Indications ?? order.DeliveryIndications ?? '',

      Notes: notes ?? order.Notes ?? '',
      StatusId: this.getOrderStatus(order.StatusId),

      OrganizationId: order.OrganizationId ?? organizationId,
      LocationId: order.LocationId ?? currentLocationId,

      Deleted: order.Deleted ?? false,
    };

    return orderToSave;
  }

  static getOrderStatus(statusId: OrderStatusEnum): OrderStatusEnum {
    if (statusId === OrderStatusEnum.Draft) {
      return OrderStatusEnum.Pending;
    } else {
      return statusId;
    }
  }

  static buildOrderItems(orderItems: OrderItem[]): OrderItem[] {
    return (
      orderItems.map((item) => ({
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
      })) ?? []
    );
  } 
}
