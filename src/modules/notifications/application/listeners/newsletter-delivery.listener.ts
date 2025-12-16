import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NewsletterDeliveryListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'NewsletterDeliveryRequested';
  }

  async handle(event: Event): Promise<void> {
    // In a real app, we'd fetch active subscribers here or receive them in payload
    // For MVP simulation:
    const { subscriberCount } = event.payload || { subscriberCount: 0 };
    // Just simulating a list of IDs based on count
    const fakeSubscribers = Array(subscriberCount).fill('user-id');
    await this.notificationService.sendWeeklyNewsletter(fakeSubscribers);
  }
}
