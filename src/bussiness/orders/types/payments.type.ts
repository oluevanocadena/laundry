export interface PaymentStatus {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export type PaymentMethods = 'cash' | 'card' | 'cashOnDelivery';
