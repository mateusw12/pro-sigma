// Tipos para requisições de pagamento

export type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

export interface CreditCardData {
  cardNumber: string;
  cardName: string;
  cardExpiry: string; // MM/AA
  cardCVV: string;
}

export interface ChangePlanRequest {
  newPlan: 'basico' | 'intermediario' | 'pro';
  paymentMethod: PaymentMethod;
  paymentData?: CreditCardData | null;
}

export interface ChangePlanResponse {
  success: boolean;
  message: string;
  paymentId?: string;
  pixQRCode?: string; // Para pagamento PIX
  boletoUrl?: string; // Para boleto bancário
  transactionId?: string;
}

export interface PaymentStatus {
  id: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'cancelled';
  amount: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  userId: string;
  plan: 'basico' | 'intermediario' | 'pro';
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: Date;
  paidAt?: Date;
  paymentMethod?: PaymentMethod;
  invoiceUrl?: string;
}
