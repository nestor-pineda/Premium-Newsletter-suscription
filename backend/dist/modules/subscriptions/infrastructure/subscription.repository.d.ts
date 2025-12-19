import { Repository } from 'typeorm';
import { Subscription, SubscriptionStatus } from '../domain/entities/subscription.entity';
export declare class SubscriptionRepository {
    private readonly repo;
    constructor(repo: Repository<Subscription>);
    create(userId: string, planId: string): Promise<Subscription>;
    updateStatus(id: string, status: SubscriptionStatus, startDate?: Date, endDate?: Date): Promise<void>;
    findByUserId(userId: string): Promise<Subscription | null>;
    findById(id: string): Promise<Subscription | null>;
    findExpiring(date: Date): Promise<Subscription[]>;
}
