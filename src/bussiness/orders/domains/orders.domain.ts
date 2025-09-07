import { TuiAppearanceOptions } from '@taiga-ui/core';
import moment from 'moment';

import { Customer } from '@bussiness/customers/customers.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

import {
  Delivery,
  Order,
  OrderTotals,
} from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import {
  DeliveryTypesEnum,
  DiscountTypesEnum,
  OrderItemStatusEnum,
  OrderStatusEnum,
  PaymentMethodsEnum,
} from '@bussiness/orders/orders.enums';
import { DeliveryTypes, DiscountTypes } from '../types/orders.types';

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
    const currentLocationId = sessionService.sessionInfo.value?.Location.id;
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
      DeliveryDate: orderDelivery.Date || order.DeliveryDate || null,
      DeliveryTime: orderDelivery.Time || order.DeliveryTime || null,
      DeliveryCost: orderDelivery.Cost ?? order.DeliveryCost ?? 0,
      DeliveryAddress: orderDelivery.Address ?? order.DeliveryAddress ?? '',
      DeliveryIndications:
        orderDelivery.Indications ?? order.DeliveryIndications ?? '',

      Notes: notes ?? order.Notes ?? '',
      StatusId: this.getOrderStatus(order.StatusId, orderDelivery.DeliveryType),

      OrganizationId: order.OrganizationId ?? organizationId,
      LocationId: order.LocationId ?? currentLocationId,

      AccountId:
        order.AccountId ?? sessionService.sessionInfo.value?.Account?.id,

      Deleted: order.Deleted ?? false,
    };

    return orderToSave;
  }

  static getOrderStatus(
    statusId: OrderStatusEnum,
    oderDeliveryType: DeliveryTypes
  ): OrderStatusEnum {
    if (oderDeliveryType === DeliveryTypesEnum.Showroom) {
      return OrderStatusEnum.Completed;
    }
    if (statusId === OrderStatusEnum.Draft) {
      return OrderStatusEnum.Pending;
    } else {
      return statusId;
    }
  }

  static canProcessOrder(order: Order | null): boolean {
    if (!order) return false;
    const itemsCount = order.OrderItems?.length ?? 0;
    const edition = !!order.id;
    const noIsDraftOrCancelled =
      order.StatusId !== OrderStatusEnum.Draft &&
      order.StatusId !== OrderStatusEnum.Cancelled;
    return itemsCount > 0 && edition && noIsDraftOrCancelled;
  }

  static canSearchProduct(order: Order | null): boolean {
    if (!order) return false;
    const isDraft = order.StatusId === OrderStatusEnum.Draft;
    const isPending = order.StatusId === OrderStatusEnum.Pending;
    return order.Paid === false && (isDraft || isPending);
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

  static statusColor(item: Order | null): TuiAppearanceOptions['appearance'] {
    let status: TuiAppearanceOptions['appearance'];
    switch (item?.StatusId) {
      case OrderStatusEnum.Draft: //Draft
        status = 'warning';
        break;
      case OrderStatusEnum.Pending: //Pending
        status = 'warning';
        break;
      case OrderStatusEnum.Processing: //Processing
        status = 'info';
        break;
      case OrderStatusEnum.Completed: //Completed
        status = 'success';
        break;
      case OrderStatusEnum.Cancelled: //Cancelled
        status = 'error';
        break;
      default:
        status = 'default';
        break;
    }
    return status;
  }

  static statusName(item: Order | null): string {
    switch (item?.StatusId) {
      case OrderStatusEnum.Draft:
        return 'Borrador';
      case OrderStatusEnum.Pending:
        return 'Sin procesar';
      case OrderStatusEnum.Processing:
        return 'En proceso';
      case OrderStatusEnum.Completed:
        return 'Entregado';
      case OrderStatusEnum.Cancelled:
        return 'Cancelado';
      default:
        return 'Sin procesar';
    }
  }
}
