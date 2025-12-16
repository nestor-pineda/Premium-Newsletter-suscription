import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class NewsletterCron {
    private readonly outboxRepo;
    private readonly logger;
    constructor(outboxRepo: OutboxRepository);
    triggerNewsletter(): Promise<void>;
}
