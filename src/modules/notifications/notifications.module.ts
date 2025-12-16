import { Module } from '@nestjs/common';
import { NotificationService } from './application/services/notification.service';
import { InvoicePaidListener } from './application/listeners/invoice-paid.listener';
import { PaymentFailedListener } from './application/listeners/payment-failed.listener';
import { NewsletterDeliveryListener } from './application/listeners/newsletter-delivery.listener';
import { NewsletterCron } from './application/cron/newsletter.cron';

@Module({
  imports: [
    // CoreModule is Global
  ],
  providers: [
    NotificationService,
    InvoicePaidListener,
    PaymentFailedListener,
    NewsletterDeliveryListener,
    NewsletterCron,
  ],
  exports: [],
})
export class NotificationsModule {}
