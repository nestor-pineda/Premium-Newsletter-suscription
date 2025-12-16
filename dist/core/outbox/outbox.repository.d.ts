import { Repository } from 'typeorm';
import { OutboxEvent } from './outbox.entity';
export declare class OutboxRepository {
    private readonly repo;
    constructor(repo: Repository<OutboxEvent>);
    save(event: Partial<OutboxEvent>): Promise<OutboxEvent>;
    findPending(limit?: number): Promise<OutboxEvent[]>;
    markProcessing(id: string): Promise<void>;
    markSent(id: string): Promise<void>;
    markFailed(id: string): Promise<void>;
}
