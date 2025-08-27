export enum OrderStatusEnum {
  Draft = 1,
  Pending = 2,
  Processing = 3,
  Completed = 4,
  Cancelled = 5,
  Refunded = 6,
}

export enum OrderItemStatusEnum {
  NotProccesed = 1,
  Processing = 2,
  Delivering = 3,
  Completed = 4,
  Cancelled = 5,
  Refunded = 6,
}

export enum PaymentMethodsEnum {
  Cash = 'cash',
  Card = 'card',
}

export enum DiscountTypesEnum {
  Percentage = 'percentage',
  Amount = 'amount',
}

export enum DeliveryTypesEnum {
  Pickup = 'pickup',
  Delivery = 'delivery',
}
