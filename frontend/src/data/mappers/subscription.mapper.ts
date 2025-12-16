import { Subscription } from '../../domain/entities/subscription.entity';

export class SubscriptionMapper {
  static toDomain(raw: any): Subscription {
    return {
      id: raw.id,
      userId: raw.user_id,
      status: raw.status,
      planId: raw.plan_id,
      currentPeriodEnd: raw.current_period_end,
      cancelAtPeriodEnd: raw.cancel_at_period_end || false,
    };
  }
}

