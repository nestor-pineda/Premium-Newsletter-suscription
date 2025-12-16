import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class NewsletterCron {
  private readonly logger = new Logger(NewsletterCron.name);

  constructor(private readonly outboxRepo: OutboxRepository) {}

  // Run every minute for demo (normally weekly)
  @Cron('0 * * * * *')
  async triggerNewsletter() {
    this.logger.log('Triggering Weekly Newsletter...');

    // In a real scenario, we might batch users or just emit one event that a worker picks up.
    // Here we emit a generic event.
    await this.outboxRepo.save({
      type: 'NewsletterDeliveryRequested',
      payload: {
        subscriberCount: 100, // stub
      },
      aggregateId: 'system',
      aggregateType: 'System',
      occurredAt: new Date().toISOString(),
    });
  }
}
