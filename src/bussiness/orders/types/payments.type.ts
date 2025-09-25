export interface PaymentStatus {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export enum PaymentStatusIdEnum {
  Pending = 1, // Pago pendiente, en espera de confirmación
  PendingOnDelivery = 2, // Pago pendiente, se realizará al momento de la entrega o recolección
  Paid = 3, // Pago completado exitosamente
  Rejected = 4, // El intento de pago fue rechazado o no se pudo procesar
  Refunded = 5, // El pago fue reembolsado después de haberse completado
  Cancelled = 6, // La orden fue cancelada antes de finalizar el pago o la entrega
}

export type PaymentMethods = 'cash' | 'card' | 'none';
