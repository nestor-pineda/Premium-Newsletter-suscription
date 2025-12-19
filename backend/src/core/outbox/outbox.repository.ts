import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxEvent, OutboxStatus } from './outbox.entity';

@Injectable()
export class OutboxRepository {
  constructor(
    @InjectRepository(OutboxEvent)
    private readonly repo: Repository<OutboxEvent>,
  ) {}

  async save(event: Partial<OutboxEvent>): Promise<OutboxEvent> {
    const newEvent = this.repo.create(event);
    return this.repo.save(newEvent);
  }

  async findPending(limit = 50): Promise<OutboxEvent[]> {
    return this.repo.find({
      where: { status: 'pending' },
      take: limit,
      order: { createdAt: 'ASC' },
    });
  }

  async markProcessing(id: string) {
    await this.repo.update(id, { status: 'processing' });
  }

  async markSent(id: string) {
    await this.repo.update(id, { status: 'sent', processedAt: new Date() });
  }

  async markFailed(id: string) {
    // In a real app, you might increment retries and only fail after N attempts
    await this.repo.update(id, { status: 'failed' });
  }
}
