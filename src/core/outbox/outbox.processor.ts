import { Injectable, Logger } from '@nestjs/common';
import { OutboxRepository } from './outbox.repository';
import { InMemoryEventBus } from '../event-bus/in-memory-event-bus';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(
    private readonly repo: OutboxRepository,
    private readonly bus: InMemoryEventBus,
  ) {}

  // call this periodically (cron) or start a loop
  async processPending() {
    const pendings = await this.repo.findPending(100);
    if (pendings.length > 0) {
      this.logger.debug(`Found ${pendings.length} pending events`);
    }

    for (const o of pendings) {
      try {
        await this.repo.markProcessing(o.id);
        
        await this.bus.publish({
          name: o.type,
          payload: o.payload,
          occurredAt: o.occurredAt,
        });

        await this.repo.markSent(o.id);
        this.logger.debug(`Event ${o.type} (id: ${o.id}) processed successfully`);
      } catch (err) {
        this.logger.error(`Failed to process event ${o.id}`, err);
        // simple retry policy
        await this.repo.markFailed(o.id);
      }
    }
  }
}

