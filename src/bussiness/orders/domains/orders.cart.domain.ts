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
    const orderItem = orderItems.find((item) => item.ProductId === product.id);
    if (orderItem) {
      orderItem.Quantity += quantity;
    } else {
      orderItems.push({
        id: 0,
        Name: product.Name,
        Description: product.Description,
        ImageUrl: product.ImageUrl,
        Quantity: quantity,
        UnitMeasureId: product.UnitMeasureId,
        UnitMeasure: product.UnitMeasure,
        Price: product.Price,
        Total: product.Price * quantity,
        Tax: 0,
        Subtotal: product.Price * quantity,
        StatusId: 1,
        Deleted: false,
        createdAt: new Date().toISOString(),
        ProductId: product.id,
      });
    }
    return orderItems;
  }

  static removeProductItem(orderItems: OrderItem[], orderItem: OrderItem) {
    const orderItemToRemove = orderItems.find(
      (item) => item.ProductId === orderItem.ProductId
    );
    if (orderItemToRemove) {
      orderItemToRemove.Quantity -= 1;
    }
    return orderItems.filter((item) => item.ProductId !== orderItem.ProductId);
  }

  static adjustProductItemQuantity(
    orderItems: OrderItem[],
    orderItem: OrderItem,
    quantity: number
  ) {
    const orderItemToAdjust = orderItems.find(
      (item) => item.ProductId === orderItem.ProductId
    );
    if (orderItemToAdjust) {
      orderItemToAdjust.Quantity = quantity;
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
    return orderItems.reduce((acc, item) => acc + item.Subtotal, 0);
  }

  static calculateTotal(orderItems: OrderItem[]) {
    return orderItems.reduce((acc, item) => acc + item.Total, 0);
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
