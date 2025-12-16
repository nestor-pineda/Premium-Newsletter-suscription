import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class SubscriptionRenewalCron {
    private readonly subRepo;
    private readonly outboxRepo;
    private readonly logger;
    constructor(subRepo: SubscriptionRepository, outboxRepo: OutboxRepository);
    checkExpiringSubscriptions(): Promise<void>;
}
