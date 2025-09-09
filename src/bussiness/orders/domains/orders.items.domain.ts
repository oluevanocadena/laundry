import { TuiAppearanceOptions } from '@taiga-ui/core';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { OrderItemStatusEnum } from '@bussiness/orders/enums/orders.enums';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';

export class OrdersItemsDomain {
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

  static statusName(item?: OrderItem | null): string {
    switch (item?.ItemStatusId) {
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

  static statusColor(item?: OrderItem | null): TuiAppearanceOptions['appearance'] {
    let status: TuiAppearanceOptions['appearance'];
    switch (item?.ItemStatusId) {
      case OrderItemStatusEnum.NotProccesed: //NotProccesed
        status = 'default';
        break;
      case OrderItemStatusEnum.Processing: //Processing
        status = 'warning';
        break;
      case OrderItemStatusEnum.ReadyToDeliver: //ReadyToDeliver
        status = 'info';
        break;
      case OrderItemStatusEnum.Delivering: //Delivering
        status = 'info';
        break;
      case OrderItemStatusEnum.Completed: //Completed
        status = 'success';
        break;
      case OrderItemStatusEnum.Cancelled: //Cancelled
        status = 'error';
        break;
      default:
        status = 'default';
        break;
    }
    return status;
  }
}
