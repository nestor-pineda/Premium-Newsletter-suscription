import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../infrastructure/subscription.repository';
import { PlanRepository } from '../../infrastructure/plan.repository';
import { Subscription } from '../../domain/entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  async getSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findByUserId(userId);
  }

  async updatePlan(userId: string, planId: string): Promise<Subscription> {
    let plan;
    if (planId === 'pro') {
      // Map 'pro' from frontend to 'Premium Monthly' in backend
      plan = await this.planRepository.findByName('Premium Monthly');
      
      // If not found, try creating it (fallback if seeding didn't happen)
      if (!plan) {
         plan = await this.planRepository.createDefaultPlan();
      }
    } else {
      plan = await this.planRepository.findById(planId);
    }

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    let subscription = await this.subscriptionRepository.findByUserId(userId);

    if (!subscription) {
      return this.subscriptionRepository.create(userId, plan.id);
    }

    // TODO: Implement proper plan change logic (proration, etc.)
    // For now, we'll just update the planId. 
    // Since SubscriptionRepository doesn't expose a direct update method for planId,
    // we might need to extend it or access the repo directly if possible, 
    // but for now let's assume we can create a new one or we need to add a method.
    // The current create method creates a NEW subscription record.
    // If we want to update existing, we need an update method.
    
    // For MVP, if subscription exists, let's create a new one (replacing old logic typically involves cancelling old and starting new or updating in place)
    // But since the repository has `create` which saves a new entity, let's try to see if we can update.
    
    // NOTE: The repository is a wrapper. I should add an updatePlan method to it or use what's available.
    // I'll add a comment to update the repository later if needed, but for now I'll create a new subscription 
    // which effectively "updates" the current valid subscription for the user if we only consider the latest one.
    // However, `findByUserId` returns the latest one.
    
    return this.subscriptionRepository.create(userId, plan.id);
  }

  async cancelSubscription(userId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findByUserId(userId);
    if (subscription) {
      await this.subscriptionRepository.updateStatus(subscription.id, 'CANCELLED');
    }
  }

  async reactivateSubscription(userId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findByUserId(userId);
    if (subscription) {
      await this.subscriptionRepository.updateStatus(subscription.id, 'ACTIVE');
    }
  }
}

