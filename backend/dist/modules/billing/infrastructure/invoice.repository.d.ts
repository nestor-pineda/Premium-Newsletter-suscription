import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from '../domain/entities/invoice.entity';
import { PaymentAttempt } from '../domain/entities/payment-attempt.entity';
export declare class InvoiceRepository {
    private readonly repo;
    private readonly attemptRepo;
    constructor(repo: Repository<Invoice>, attemptRepo: Repository<PaymentAttempt>);
    create(userId: string, subscriptionId: string, amount: number, currency?: string): Promise<Invoice>;
    addAttempt(invoiceId: string, success: boolean, transactionId?: string, errorReason?: string): Promise<PaymentAttempt>;
    updateStatus(id: string, status: InvoiceStatus, paidAt?: Date): Promise<void>;
}
