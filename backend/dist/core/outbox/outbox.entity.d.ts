export type OutboxStatus = 'pending' | 'processing' | 'sent' | 'failed';
export declare class OutboxEvent {
    id: string;
    aggregateType: string;
    aggregateId: string;
    type: string;
    payload: any;
    occurredAt: string;
    status: OutboxStatus;
    retries: number;
    createdAt: Date;
    processedAt: Date;
}
