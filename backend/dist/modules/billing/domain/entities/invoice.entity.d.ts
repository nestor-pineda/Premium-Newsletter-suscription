import { PaymentAttempt } from './payment-attempt.entity';
export type InvoiceStatus = 'PENDING' | 'PAID' | 'FAILED';
export declare class Invoice {
    id: string;
    userId: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    status: InvoiceStatus;
    createdAt: Date;
    updatedAt: Date;
    paidAt: Date;
    attempts: PaymentAttempt[];
}
