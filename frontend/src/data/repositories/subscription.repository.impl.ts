import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from '../../domain/entities/subscription.entity';
import api from '../sources/api';
import { SubscriptionMapper } from '../mappers/subscription.mapper';

export class SubscriptionRepositoryImpl implements ISubscriptionRepository {
  async getSubscription(): Promise<Subscription | null> {
    try {
        const response = await api.get('/subscriptions/me');
        return SubscriptionMapper.toDomain(response.data);
    } catch {
        return null;
    }
  }

  async updatePlan(planId: string): Promise<Subscription> {
    const response = await api.patch('/subscriptions/me', { planId });
    return SubscriptionMapper.toDomain(response.data);
  }

  async cancelSubscription(): Promise<void> {
    await api.delete('/subscriptions/me');
  }

  async reactivateSubscription(): Promise<void> {
    await api.post('/subscriptions/me/reactivate');
  }
}

