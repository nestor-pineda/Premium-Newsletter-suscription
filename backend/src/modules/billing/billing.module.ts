import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './domain/entities/invoice.entity';
import { PaymentAttempt } from './domain/entities/payment-attempt.entity';
import { InvoiceRepository } from './infrastructure/invoice.repository';
import { PaymentGateway } from './application/services/payment.gateway';
import { SubscriptionCreatedListener } from './application/listeners/subscription-created.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, PaymentAttempt]),
    // CoreModule is Global
  ],
  providers: [InvoiceRepository, PaymentGateway, SubscriptionCreatedListener],
  exports: [InvoiceRepository],
})
export class BillingModule {}
