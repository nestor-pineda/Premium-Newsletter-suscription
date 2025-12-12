import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice, InvoiceStatus } from '../domain/entities/invoice.entity';
import { PaymentAttempt } from '../domain/entities/payment-attempt.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repo: Repository<Invoice>,
    @InjectRepository(PaymentAttempt)
    private readonly attemptRepo: Repository<PaymentAttempt>,
  ) {}

  async create(userId: string, subscriptionId: string, amount: number, currency = 'USD'): Promise<Invoice> {
    const invoice = this.repo.create({
      userId,
      subscriptionId,
      amount,
      currency,
      status: 'PENDING',
    });
    return this.repo.save(invoice);
  }

  async addAttempt(invoiceId: string, success: boolean, transactionId?: string, errorReason?: string): Promise<PaymentAttempt> {
    const attempt = this.attemptRepo.create({
      invoiceId,
      success,
      transactionId,
      errorReason,
    });
    return this.attemptRepo.save(attempt);
  }

  async updateStatus(id: string, status: InvoiceStatus, paidAt?: Date): Promise<void> {
    const updateData: any = { status };
    if (paidAt) updateData.paidAt = paidAt;
    await this.repo.update(id, updateData);
  }
}

