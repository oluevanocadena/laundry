import { AfterViewInit, Component } from '@angular/core';
import { OrdersMonitorFacade } from '@bussiness/orders/controllers/orders.monitor.facade';
import { DeliveryTypesEnum } from '@bussiness/orders/orders.enums';
import { Order } from '@bussiness/orders/orders.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent extends HelperPage implements AfterViewInit {
  constructor(public facade: OrdersMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  statusName(item: Order): string {
    switch (item?.StatusId) {
      case 1:
        return 'Borrador';
      case 2:
        return 'Sin procesar';
      case 3:
        return 'En proceso';
      case 4:
        return 'Completado';
      case 5:
        return 'Cancelado';
      case 6:
        return 'Reembolsado';
      default:
        return 'Sin procesar';
    }
  }

  deliveryTypeName(item: Order): string {
    switch (item?.DeliveryType) {
      case DeliveryTypesEnum.Showroom:
        return 'Venta de mostrador';
      case DeliveryTypesEnum.Delivery:
        return 'Entrega a domicilio';
      case DeliveryTypesEnum.Pickup:
        return 'Recolección en sucursal';
    }
    return '';
  }

  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    this.facade.initialize();
  }
}
