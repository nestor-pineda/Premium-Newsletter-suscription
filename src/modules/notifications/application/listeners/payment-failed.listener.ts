import { Injectable, OnModuleInit } from '@nestjs/common';
import { InMemoryEventBus } from '../../../../core/event-bus/in-memory-event-bus';
import { EventHandler } from '../../../../core/event-bus/event-handler';
import { Event } from '../../../../core/event-bus/event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class PaymentFailedListener implements EventHandler, OnModuleInit {
  constructor(
    private readonly eventBus: InMemoryEventBus,
    private readonly notificationService: NotificationService,
  ) {}

  onModuleInit() {
    this.eventBus.register(this);
  }

  supports(event: Event): boolean {
    return event.name === 'PaymentFailed';
  }

  async handle(event: Event): Promise<void> {
    const { userId, invoiceId, reason } = event.payload;
    await this.notificationService.sendPaymentRetryWarning(userId, invoiceId, reason);
  }
}

