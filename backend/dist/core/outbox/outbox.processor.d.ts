import { OutboxRepository } from './outbox.repository';
import { InMemoryEventBus } from '../event-bus/in-memory-event-bus';
export declare class OutboxProcessor {
    private readonly repo;
    private readonly bus;
    private readonly logger;
    constructor(repo: OutboxRepository, bus: InMemoryEventBus);
    processPending(): Promise<void>;
}
