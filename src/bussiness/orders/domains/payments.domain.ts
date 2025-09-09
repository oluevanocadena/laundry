import { OrderStatusEnum } from '../enums/orders.enums';
import { Order } from '../interfaces/orders.interfaces';

export class PaymentsDomain {
  static canRefund(order: Order | null): boolean {
    if (!order) return false;
    const isPaid = order.Paid;
    return order.StatusId === OrderStatusEnum.Pending && isPaid;
  }

  static canCollectPayment(order: Order | null): boolean {
    if (!order) return false;
    const isPaid = order.Paid;
    return order.StatusId === OrderStatusEnum.Pending && isPaid === false;
  }

  static canAddDiscount(order: Order | null): boolean {
    if (!order) return false;
    const isPaid = order.Paid;
    const total = order.Total;
    const isPending = order.StatusId === OrderStatusEnum.Pending;
    const isDraft = order.StatusId === OrderStatusEnum.Draft;
    const discount = order.Discount;
    return (
      (isPending || isDraft) && isPaid === false && total > 0 && discount === 0
    );
  }

  static canRemoveDiscount(order: Order | null): boolean {
    if (!order) return false;
    const discount = order.Discount;
    const isPending = order.StatusId === OrderStatusEnum.Pending;
    const isDraft = order.StatusId === OrderStatusEnum.Draft;
    return (isPending || isDraft) && discount > 0;
  }
}
