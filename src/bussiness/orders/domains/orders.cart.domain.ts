import { Product } from '@bussiness/products/products.interfaces';
import { OrderItem, OrderTotals } from '../orders.interfaces';

const TAX_RATE_IVA = 0.16;

export class OrdersCartDomain {
  constructor() {}

  static addProductItem(
    orderItems: OrderItem[],
    product: Product,
    quantity: number
  ): OrderItem[] {
    const index = orderItems.findIndex((item) => item.ProductId === product.id);

    if (index >= 0) {
      const updatedItem = {
        ...orderItems[index],
        Quantity: orderItems[index].Quantity + quantity,
        Subtotal:
          orderItems[index].Price * (orderItems[index].Quantity + quantity),
        Total:
          orderItems[index].Price * (orderItems[index].Quantity + quantity), // o aplica impuestos si hay lógica
      };

      return [
        ...orderItems.slice(0, index),
        updatedItem,
        ...orderItems.slice(index + 1),
      ];
    }

    const newItem: OrderItem = {
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
    };

    return [...orderItems, newItem];
  }

  static removeProductItem(
    orderItems: OrderItem[],
    orderItem: OrderItem
  ): OrderItem[] {
    return orderItems.filter((item) => item.ProductId !== orderItem.ProductId);
  }

  static adjustProductItemQuantity(
    orderItems: OrderItem[],
    orderItem: OrderItem,
    quantity: number
  ): OrderItem[] {
    return orderItems.map((item) =>
      item.ProductId === orderItem.ProductId
        ? { ...item, Quantity: quantity }
        : { ...item }
    );
  }

  static calculateTotals(
    orderItems: OrderItem[],
    discount: number
  ): OrderTotals {
    // Calculamos el subtotal sumando los precios de los items
    const subtotal = this.calculateSubtotal(orderItems);

    // Como el precio del producto ya incluye IVA, necesitamos extraer el impuesto
    // del subtotal en lugar de agregarlo
    const tax = this.extractTaxFromSubtotal(subtotal);

    // El delivery es 0 por ahora
    const delivery = 0;

    // El total es: subtotal + delivery - descuento (el tax ya está incluido en subtotal)
    const total = subtotal + delivery - discount;

    return {
      Total: total,
      Subtotal: subtotal - tax,
      Taxes: tax,
      Delivery: delivery,
      Discount: discount,
    };
  }

  static extractTaxFromSubtotal(subtotal: number) {
    // Si el precio ya incluye IVA (16%), entonces el subtotal es precio con IVA
    // Para extraer el IVA: subtotal - (subtotal / 1.16)
    return subtotal - subtotal / (1 + TAX_RATE_IVA);
  }

  static calculateSubtotal(orderItems: OrderItem[]) {
    return orderItems.reduce(
      (acc, item) => acc + item.Subtotal * item.Quantity,
      0
    );
  }
}
