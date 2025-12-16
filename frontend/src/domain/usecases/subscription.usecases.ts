import { ISubscriptionRepository } from '../repositories/subscription.repository';
import { Subscription } from '../entities/subscription.entity';

export class GetSubscriptionStatusUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  execute(): Promise<Subscription | null> {
    return this.subscriptionRepository.getSubscription();
  }
}

export class UpdatePlanUseCase {
    constructor(private subscriptionRepository: ISubscriptionRepository) {}
  
    execute(planId: string): Promise<Subscription> {
      return this.subscriptionRepository.updatePlan(planId);
    }
}

export class CancelSubscriptionUseCase {
    constructor(private subscriptionRepository: ISubscriptionRepository) {}
  
    execute(): Promise<void> {
      return this.subscriptionRepository.cancelSubscription();
    }
}

