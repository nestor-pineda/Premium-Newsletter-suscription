import { Subscription } from '../entities/subscription.entity';

export interface ISubscriptionRepository {
  getSubscription(): Promise<Subscription | null>;
  updatePlan(planId: string): Promise<Subscription>;
  cancelSubscription(): Promise<void>;
  reactivateSubscription(): Promise<void>;
}

