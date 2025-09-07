import { Entities, Events } from '../interfaces/notifications.interfaces';

export class NotificationsDomain {
  static notificationType(event: Events): string {
    switch (event) {
      case Events.Created:
        return 'success';
      case Events.Updated:
        return 'info';
      case Events.Deleted:
        return 'error';
      case Events.Paid:
        return 'success';
      case Events.Shipped:
        return 'info';
      case Events.Canceled:
        return 'error';
      default:
        return 'info';
    }
  }

  static getUrlMap(entity: Entities, id: string): string {
    switch (entity) {
      case Entities.Order:
        return `/orders/draft/?orderId=${id}`;
      case Entities.Customer:
        return `/customers/draft/?customerId=${id}`;
      case Entities.Product:
        return `/products/draft/?productId=${id}`;
      case Entities.Invoice:
        return `/invoices/draft/?invoiceId=${id}`;
      case Entities.Payment:
        return `/payments/draft/?paymentId=${id}`;
      case Entities.Delivery:
        return `/deliveries/draft/?deliveryId=${id}`;
      default:
        return '';
    }
  }
}
