import { Injectable } from '@nestjs/common';
import { EventBus } from './event-bus.interface';
import { Event } from './event';
import { EventHandler } from './event-handler';

@Injectable()
export class InMemoryEventBus implements EventBus {
  private handlers: EventHandler[] = [];

  register(handler: EventHandler) {
    this.handlers.push(handler);
  }

  async publish(event: Event) {
    const handlers = this.handlers.filter((h) => h.supports(event));
    // run handlers in parallel but don't wait sequentially
    await Promise.all(handlers.map((h) => Promise.resolve(h.handle(event))));
  }

  async publishAll(events: Event[]) {
    for (const e of events) await this.publish(e);
  }
}
