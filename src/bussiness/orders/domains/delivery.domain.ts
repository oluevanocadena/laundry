import { DeliveryTypesEnum } from '@bussiness/orders/enums/order.delivery.enums';
import { OrderStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { Delivery, Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { DeliveryTypes } from '../types/orders.types';

export class DeliveryDomain {
  static canAdjustDelivery(order: Order | null): boolean {
    if (!order) return false;
    const itemCount = order.ItemCount;
    return itemCount > 0;
  }

  static canChangeDelivery(order: Order | null): boolean {
    if (!order) return false;
    const isDraft = order.StatusId === OrderStatusEnum.Draft;
    const itemCount = order.ItemCount;
    const isPendingPayment = order.Paid === false;
    return isDraft ? itemCount > 0 : isPendingPayment;
  }

  static getUrlMap(address?: string | null): string {
    return address ? `https://www.google.com/maps/search/${encodeURIComponent(address)}` : '';
  }

  static deliveryTypeName(delivery: Delivery | null | DeliveryTypes): string {
    const deliveryType = typeof delivery === 'string' ? delivery : delivery?.DeliveryType;
    switch (deliveryType) {
      case DeliveryTypesEnum.Pickup:
        return 'Recolección en sucursal';
      case DeliveryTypesEnum.Delivery:
        return 'Envío a domicilio';
      case DeliveryTypesEnum.Showroom:
        return 'Venta de mostrador';
      default:
        return '';
    }
  }

  static isDelivery(order?: Order | null): boolean {
    if (!order) return false;
    return order.DeliveryType === DeliveryTypesEnum.Delivery;
  }
}
