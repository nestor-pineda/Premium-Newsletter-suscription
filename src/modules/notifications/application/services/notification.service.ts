import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendWelcomeEmail(userId: string, subscriptionId: string) {
    // Simulate email sending
    this.logger.log(
      `[EMAIL] Sending Welcome Email to User ${userId} for Subscription ${subscriptionId}`,
    );
  }

  async sendPaymentRetryWarning(
    userId: string,
    invoiceId: string,
    reason: string,
  ) {
    this.logger.warn(
      `[EMAIL] Sending Payment Failed Warning to User ${userId} for Invoice ${invoiceId}. Reason: ${reason}`,
    );
  }

  async sendWeeklyNewsletter(subscriberIds: string[]) {
    this.logger.log(
      `[EMAIL] Sending Weekly Newsletter to ${subscriberIds.length} subscribers.`,
    );
  }
}
