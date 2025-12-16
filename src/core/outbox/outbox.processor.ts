import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRepository } from './outbox.repository';
import { InMemoryEventBus } from '../event-bus/in-memory-event-bus';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(
    private readonly repo: OutboxRepository,
    private readonly bus: InMemoryEventBus,
  ) {}

  @Cron('*/10 * * * * *') // Run every 10 seconds
  async processPending() {
    const pendings = await this.repo.findPending(100);
    if (pendings.length > 0) {
      this.logger.debug(`Found ${pendings.length} pending events`);
    }

    for (const outboxEvent of pendings) {
      try {
        await this.repo.markProcessing(o.id);

        await this.bus.publish({
          name: outboxEvent.type,
          payload: outboxEvent.payload,
          occurredAt: outboxEvent.occurredAt,
        });

        await this.repo.markSent(outboxEvent.id);
        this.logger.debug(
          `Event ${outboxEvent.type} (id: ${outboxEvent.id}) processed successfully`,
        );
      } catch (err) {
        this.logger.error(`Failed to process event ${outboxEvent.id}`, err);
        // simple retry policy
        await this.repo.markFailed(outboxEvent.id);
      }
    }
  }
}
