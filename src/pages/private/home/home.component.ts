import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HomeFacade } from '@bussiness/home/controllers/home.facade';
import { OrdersMonitorFacade } from '@bussiness/orders/controllers/orders.monitor.facade';
import { DeliveryDomain } from '@bussiness/orders/domains/delivery.domain';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { PaymentStatusIdEnum } from '@bussiness/orders/enums/order.payment.enums';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends HelperPage {
  ordersDomain = OrdersDomain;
  deliveryDomain = DeliveryDomain;

  constructor(
    public facade: HomeFacade,
    public ordersFacade: OrdersMonitorFacade,
    public sessionFacade: SessionFacade,
    public cdr: ChangeDetectorRef,
  ) {
    super();
  }

  /**
   * UI Events
   */

  getPaymentStatusAppearance(order: Order) {
    switch (order.PaymentStatusId) {
      case PaymentStatusIdEnum.Pending:
        return 'warning';
      case PaymentStatusIdEnum.PendingOnDelivery:
        return 'info';
      case PaymentStatusIdEnum.Paid:
        return 'success';
      case PaymentStatusIdEnum.Rejected:
        return 'error';
      case PaymentStatusIdEnum.Refunded:
        return 'success';
      case PaymentStatusIdEnum.Cancelled:
        return 'error';
      default:
        return 'default';
    }
  }

  /**
   * Getters
   */

  get busy() {
    return this.facade.api.busy.value;
  }

  get data() {
    return this.ordersFacade.api.pagedOrders.value?.data ?? [];
  }

  get rowCount() {
    return this.ordersFacade.api.pagedOrders.value?.count ?? 0;
  }

  /**
   * LifeCycle
   */

  ngOnInit() {
    if (this.ordersFacade.tablePagination.value) {
      this.ordersFacade.tablePagination.value.pageSize = 10;
    }
    this.ordersFacade.initialize();
    this.facade.api.busy.onChange((value) => {
      this.cdr.detectChanges();
    });
    this.ordersFacade.api.pagedOrders.onChange((value) => {
      this.cdr.detectChanges();
    });
  }
}
