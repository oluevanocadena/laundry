import { Product } from '@bussiness/products/products.interfaces';
import { OrderItem } from '../orders.interfaces';

const TAX_RATE_IVA = 0.16;

export class OrdersCartDomain {
  constructor() {}

  static addProductItem(
    orderItems: OrderItem[],
    product: Product,
    quantity: number
  ) {
    const orderItem = orderItems.find((item) => item.productId === product.id);
    if (orderItem) {
      orderItem.quantity += quantity;
    } else {
      orderItems.push({
        id: 0,
        name: product.Name,
        status: 'Not Proccesed',
        statusId: 1,
        categoryId: 0,
        category: 'Laundry',
        quantity: quantity,
        price: product.Price,
        total: product.Price * quantity,
        tax: 0,
        subtotal: product.Price * quantity,
        isDeliveryFee: false,
        productId: product.id,
        oderId: '1',
      });
    }
    return orderItems;
  }

  static removeProductItem(orderItems: OrderItem[], product: Product) {
    const orderItem = orderItems.find((item) => item.productId === product.id);
    if (orderItem) {
      orderItem.quantity -= 1;
    }
    return orderItems;
  }

  static adjustProductItemQuantity(
    orderItems: OrderItem[],
    product: Product,
    quantity: number
  ) {
    const orderItem = orderItems.find((item) => item.productId === product.id);
    if (orderItem) {
      orderItem.quantity = quantity;
    }
    return orderItems;
  }

  static calculateTotals(
    orderItems: OrderItem[],
    discount: number
  ): OrderTotals {
    const total = this.calculateTotal(orderItems);
    const subtotal = this.calculateSubtotal(orderItems);
    const tax = this.calculateTax(subtotal);
    const totalWithTax = this.calculateTotalWithTax(orderItems);
    const totalWithDiscount = this.calculateTotalWithDiscount(
      totalWithTax,
      discount
    );
    return { total, subtotal, tax, totalWithTax, totalWithDiscount };
  }

  static calculateTax(subtotal: number) {
    return subtotal * TAX_RATE_IVA;
  }

  static calculateSubtotal(orderItems: OrderItem[]) {
    return orderItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  static calculateTotal(orderItems: OrderItem[]) {
    return orderItems.reduce((acc, item) => acc + item.total, 0);
  }

  static calculateTotalWithTax(orderItems: OrderItem[]) {
    const subtotal = this.calculateSubtotal(orderItems);
    const tax = this.calculateTax(subtotal);
    return subtotal + tax;
  }

  static calculateTotalWithDiscount(totalWithTax: number, discount: number) {
    return totalWithTax - discount;
  }
}

export interface OrderTotals {
  total: number;
  subtotal: number;
  tax: number;
  totalWithTax: number;
  totalWithDiscount: number;
}
