import { Invoice } from './invoice.entity';
export declare class PaymentAttempt {
    id: string;
    invoiceId: string;
    invoice: Invoice;
    success: boolean;
    transactionId: string;
    errorReason: string;
    createdAt: Date;
}
