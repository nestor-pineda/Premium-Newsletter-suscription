import { EventBus } from './event-bus.interface';
import { Event } from './event';
import { EventHandler } from './event-handler';
export declare class InMemoryEventBus implements EventBus {
    private handlers;
    register(handler: EventHandler): void;
    publish(event: Event): Promise<void>;
    publishAll(events: Event[]): Promise<void>;
}
