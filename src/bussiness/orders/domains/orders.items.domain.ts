import { OrderItem } from '../orders.interfaces';
import { OrderItemStatusEnum } from '../orders.enums';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

export class OrdersItemsDomain {
  static statusName(item: OrderItem): string {
    switch (item.ItemStatusId) {
      case OrderItemStatusEnum.NotProccesed:
        return 'Sin procesar';
      case OrderItemStatusEnum.Processing:
        return 'En proceso';
      case OrderItemStatusEnum.ReadyToDeliver:
        return 'Listo a entrega';
      case OrderItemStatusEnum.Delivering:
        return 'En entrega';
      case OrderItemStatusEnum.Completed:
        return 'Completado';
      case OrderItemStatusEnum.Cancelled:
        return 'Cancelado';
    }
    return 'Desconocido';
  }

  static statusesOptions(): NzSegmentedOption[] {
    return [
      {
        label: 'Sin procesar',
        value: OrderItemStatusEnum.NotProccesed,
      },
      {
        label: 'En proceso',
        value: OrderItemStatusEnum.Processing,
      },
      {
        label: 'Listo a entrega',
        value: OrderItemStatusEnum.ReadyToDeliver,
      },
      {
        label: 'En entrega',
        value: OrderItemStatusEnum.Delivering,
      },
      {
        label: 'Completado',
        value: OrderItemStatusEnum.Completed,
      },
      {
        label: 'Cancelado',
        value: OrderItemStatusEnum.Cancelled,
      },
    ];
  }
}
