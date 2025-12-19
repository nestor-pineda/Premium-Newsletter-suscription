import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { PlanRepository } from '../../infrastructure/plan.repository';
import { Subscription } from '../../domain/entities/subscription.entity';
export declare class SubscriptionsService {
    private readonly subscriptionRepository;
    private readonly planRepository;
    constructor(subscriptionRepository: SubscriptionRepository, planRepository: PlanRepository);
    getSubscription(userId: string): Promise<Subscription | null>;
    updatePlan(userId: string, planId: string): Promise<Subscription>;
    cancelSubscription(userId: string): Promise<void>;
    reactivateSubscription(userId: string): Promise<void>;
}
