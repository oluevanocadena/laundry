import { NotificationsEntitiesEnum, NotificationsEventsEnum } from '@bussiness/notifications/enums/notifications.enums';
import { Notification as INotification } from '@bussiness/notifications/interfaces/notifications.interfaces';

export class NotificationsDomain {
  static notificationType(event: NotificationsEventsEnum): string {
    switch (event) {
      case NotificationsEventsEnum.Created:
        return 'success';
      case NotificationsEventsEnum.Updated:
        return 'info';
      case NotificationsEventsEnum.Deleted:
        return 'error';
      case NotificationsEventsEnum.Paid:
        return 'success';
      case NotificationsEventsEnum.Shipped:
        return 'info';
      case NotificationsEventsEnum.Canceled:
        return 'error';
      default:
        return 'info';
    }
  }

  static getUrlMap(entity: NotificationsEntitiesEnum, id: string): string {
    switch (entity) {
      case NotificationsEntitiesEnum.Order:
        return `/orders/draft/?orderId=${id}`;
      case NotificationsEntitiesEnum.Customer:
        return `/customers/draft/?customerId=${id}`;
      case NotificationsEntitiesEnum.Product:
        return `/products/draft/?productId=${id}`;
      case NotificationsEntitiesEnum.Invoice:
        return `/invoices/draft/?invoiceId=${id}`;
      case NotificationsEntitiesEnum.Payment:
        return `/payments/draft/?paymentId=${id}`;
      case NotificationsEntitiesEnum.Delivery:
        return `/deliveries/draft/?deliveryId=${id}`;
      default:
        return '';
    }
  }

  static mapNotification(payload: any): INotification {
    return {
      id: payload.new['id'],
      created_At: payload.new['created_At'],
      updated_At: payload.new['updated_At'],
      Title: payload.new['Title'],
      Message: payload.new['Message'],
      Entity: payload.new['Entity'],
      Event: payload.new['Event'],
      Metadata: payload.new['Metadata'],
      Readed: payload.new['Readed'],
      AccountId: payload.new['AccountId'],
      OrganizationId: payload.new['OrganizationId'],
    };
  }
}
