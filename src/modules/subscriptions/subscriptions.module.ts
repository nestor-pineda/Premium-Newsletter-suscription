import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './domain/entities/subscription.entity';
import { Plan } from './domain/entities/plan.entity';
import { SubscriptionRepository } from './infrastructure/subscription.repository';
import { PlanRepository } from './infrastructure/plan.repository';
import { UserCreatedListener } from './application/listeners/user-created.listener';
import { InvoicePaidListener } from './application/listeners/invoice-paid.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Plan]),
    // CoreModule is Global
  ],
  providers: [
    SubscriptionRepository,
    PlanRepository,
    UserCreatedListener,
    InvoicePaidListener,
  ],
  exports: [SubscriptionRepository],
})
export class SubscriptionsModule {}

