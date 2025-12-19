import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { InvoiceRepository } from '../../infrastructure/invoice.repository';
import { PaymentGateway } from '../services/payment.gateway';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class SubscriptionCreatedListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly invoiceRepo: InvoiceRepository,
    private readonly paymentGateway: PaymentGateway,
    private readonly outboxRepo: OutboxRepository,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'SubscriptionCreated';
  }

  async handle(event: Event): Promise<void> {
    const { subscriptionId, userId, price } = event.payload;
    console.log(
      `[Billing] Handling SubscriptionCreated for sub ${subscriptionId}`,
    );

    // 1. Generate Invoice
    const invoice = await this.invoiceRepo.create(
      userId,
      subscriptionId,
      price,
    );

    // 2. Attempt Payment
    console.log(`[Billing] Attempting payment for invoice ${invoice.id}...`);
    const paymentResult = await this.paymentGateway.charge(
      price,
      'USD',
      'tok_visa',
    ); // sourceId would normally come from user stored payment methods

    // 3. Record Attempt
    await this.invoiceRepo.addAttempt(
      invoice.id,
      paymentResult.success,
      paymentResult.transactionId,
      paymentResult.error,
    );

    if (paymentResult.success) {
      // 4a. Success Flow
      const paidAt = new Date();
      await this.invoiceRepo.updateStatus(invoice.id, 'PAID', paidAt);

      console.log(`[Billing] Payment Successful for invoice ${invoice.id}`);

      // Emit InvoicePaid
      await this.outboxRepo.save({
        type: 'InvoicePaid',
        payload: {
          invoiceId: invoice.id,
          subscriptionId: subscriptionId,
          userId: userId,
          amount: price,
          paidAt: paidAt.toISOString(),
          transactionId: paymentResult.transactionId,
        },
        aggregateId: invoice.id,
        aggregateType: 'Invoice',
        occurredAt: new Date().toISOString(),
      });
    } else {
      // 4b. Failure Flow
      await this.invoiceRepo.updateStatus(invoice.id, 'FAILED');

      console.warn(
        `[Billing] Payment Failed for invoice ${invoice.id}: ${paymentResult.error}`,
      );

      // Emit PaymentFailed
      await this.outboxRepo.save({
        type: 'PaymentFailed',
        payload: {
          invoiceId: invoice.id,
          subscriptionId: subscriptionId,
          userId: userId,
          amount: price,
          reason: paymentResult.error,
        },
        aggregateId: invoice.id,
        aggregateType: 'Invoice',
        occurredAt: new Date().toISOString(),
      });
    }
  }
}
