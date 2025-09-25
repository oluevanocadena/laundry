export interface PaymentStatus {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export enum PaymentStatusIdEnum {
  Pending = 'Pending', // Pago pendiente, en espera de confirmación
  PendingOnDelivery = 'PendingOnDelivery', // Pago pendiente, se realizará al momento de la entrega o recolección
  Paid = 'Paid', // Pago completado exitosamente
  Rejected = 'Rejected', // El intento de pago fue rechazado o no se pudo procesar
  Refunded = 'Refunded', // El pago fue reembolsado después de haberse completado
  Cancelled = 'Cancelled', // La orden fue cancelada antes de finalizar el pago o la entrega
}

export type PaymentMethods = 'cash' | 'card' | 'none';
