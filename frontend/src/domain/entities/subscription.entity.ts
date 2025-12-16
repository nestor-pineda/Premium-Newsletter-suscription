export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';

export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  planId: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

