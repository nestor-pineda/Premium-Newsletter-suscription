import { SubscriptionsService } from '../../application/services/subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getSubscription(req: any): Promise<import("../../domain/entities/subscription.entity").Subscription | null>;
    updatePlan(req: any, planId: string): Promise<import("../../domain/entities/subscription.entity").Subscription>;
    cancelSubscription(req: any): Promise<void>;
    reactivateSubscription(req: any): Promise<void>;
}
