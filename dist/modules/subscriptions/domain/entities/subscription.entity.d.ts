import { Plan } from './plan.entity';
export type SubscriptionStatus = 'PENDING_PAYMENT' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
export declare class Subscription {
    id: string;
    userId: string;
    planId: string;
    plan: Plan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
