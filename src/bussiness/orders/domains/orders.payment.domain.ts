import { PaymentMethodsEnum, PaymentStatusIdEnum, PaymentStatusNameEnum } from '@bussiness/orders/enums/order.payment.enums';

export class OrdersPaymentDomain {
  static getPaymentStatusByMethod(paymentMethod: PaymentMethodsEnum) {
    switch (paymentMethod) {
      case PaymentMethodsEnum.Card:
      case PaymentMethodsEnum.Cash:
        return PaymentStatusIdEnum.Paid;
      case PaymentMethodsEnum.CashOnDelivery:
        return PaymentStatusIdEnum.PendingOnDelivery;
      default:
        return PaymentStatusIdEnum.Pending;
    }
  }

  static getPaymentStatusNameByMethod(paymentStatusId: PaymentStatusIdEnum) {
    switch (paymentStatusId) {
      case PaymentStatusIdEnum.Paid:
        return PaymentStatusNameEnum.Paid;
      case PaymentStatusIdEnum.PendingOnDelivery:
        return PaymentStatusNameEnum.PendingOnDelivery;
      case PaymentStatusIdEnum.Pending:
        return PaymentStatusNameEnum.Pending;
      case PaymentStatusIdEnum.Rejected:
        return PaymentStatusNameEnum.Rejected;
      case PaymentStatusIdEnum.Refunded:
        return PaymentStatusNameEnum.Refunded;
      case PaymentStatusIdEnum.Cancelled:
        return PaymentStatusNameEnum.Cancelled;
      default:
        return PaymentStatusNameEnum.Pending;
    }
  }
}
