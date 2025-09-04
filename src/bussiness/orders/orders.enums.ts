export enum OrderStatusEnum {
  Draft = 1,
  Pending = 2,
  Processing = 3,
  Completed = 4,
  Cancelled = 5,
}

export enum OrderItemStatusEnum {
  NotProccesed = 1,
  Processing = 2,
  ReadyToDeliver = 3,
  Delivering = 4,
  Completed = 5,
  Cancelled = 6
}

export enum PaymentMethodsEnum {
  Cash = 'cash',
  Card = 'card',
  None = 'none',
}

export enum DiscountTypesEnum {
  Percentage = 'percentage',
  Amount = 'amount',
}

export enum DeliveryTypesEnum {
  Pickup = 'pickup',
  Delivery = 'delivery',
  Showroom = 'showroom',
}
