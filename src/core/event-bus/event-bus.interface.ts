import { Event } from './event';
import { EventHandler } from './event-handler';

export interface EventBus {
  publish(event: Event): Promise<void>;
  publishAll(events: Event[]): Promise<void>;
  register(handler: EventHandler): void;
}

