import { Injectable } from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription, SubscriptionStatus } from '../domain/entities/subscription.entity';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
  ) {}

  async create(userId: string, planId: string): Promise<Subscription> {
    const sub = this.repo.create({
      userId,
      planId,
      status: 'PENDING_PAYMENT',
    });
    return this.repo.save(sub);
  }

  async updateStatus(id: string, status: SubscriptionStatus, startDate?: Date, endDate?: Date): Promise<void> {
    const updateData: any = { status };
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    
    await this.repo.update(id, updateData);
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    return this.repo.findOne({ where: { userId }, order: { createdAt: 'DESC' } });
  }
  
  async findById(id: string): Promise<Subscription | null> {
      return this.repo.findOne({ where: { id } });
  }

  async findExpiring(date: Date): Promise<Subscription[]> {
    return this.repo.find({
      where: {
        status: 'ACTIVE',
        endDate: LessThan(date),
      },
      relations: ['plan'],
    });
  }
}
