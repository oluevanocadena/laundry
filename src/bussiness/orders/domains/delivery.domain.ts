import { DeliveryTypesEnum, OrderStatusEnum } from '../orders.enums';
import { Delivery, Order } from '../orders.interfaces';

export class DeliveryDomain {
  static canAdjustDelivery(order: Order | null): boolean {
    if (!order) return false;
    const itemCount = order.ItemCount;
    return itemCount > 0;
  }

  static canChangeDelivery(order: Order | null): boolean {
    if (!order) return false;
    const isCompleted = order.StatusId === OrderStatusEnum.Completed;
    const isCancelled = order.StatusId === OrderStatusEnum.Cancelled;
    const paid = order.Paid;
    return (isCompleted || isCancelled) && paid;
  }

  static getUrlMap(address?: string | null): string {
    return address
      ? `https://www.google.com/maps/search/${encodeURIComponent(address)}`
      : '';
  }

  static deliveryTypeName(delivery: Delivery | null): string {
    switch (delivery?.DeliveryType) {
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
}
